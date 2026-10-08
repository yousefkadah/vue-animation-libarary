var e=`<script lang="ts">
import { shallowReactive } from 'vue'

/**
 * Page-wide bookkeeping shared by every SmoothCursor: only the most recently mounted, enabled
 * instance draws a cursor, and the native cursor is hidden while at least one is active.
 */
const activeInstances = shallowReactive<symbol[]>([])
let hiddenCursorOwner: symbol | null = null
let savedBodyCursor = ''

function activate(id: symbol) {
  if (!activeInstances.includes(id)) activeInstances.push(id)
  if (hiddenCursorOwner === null) {
    hiddenCursorOwner = id
    savedBodyCursor = document.body.style.cursor
    document.body.style.cursor = 'none'
  }
}

function deactivate(id: symbol) {
  const index = activeInstances.indexOf(id)
  if (index >= 0) activeInstances.splice(index, 1)
  if (activeInstances.length === 0 && hiddenCursorOwner !== null) {
    document.body.style.cursor = savedBodyCursor
    hiddenCursorOwner = null
  }
}
<\/script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { motion, useSpring } from 'motion-v'

export interface SmoothCursorSpringConfig {
  damping: number
  stiffness: number
  mass: number
  restDelta: number
}

export interface SmoothCursorProps {
  /** Spring used to follow the pointer. Rotation and scale derive their own springs from it. */
  springConfig?: SmoothCursorSpringConfig
}

const props = withDefaults(defineProps<SmoothCursorProps>(), {
  springConfig: () => ({ damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }),
})

defineSlots<{
  /** Custom cursor. Defaults to an arrow with a soft shadow. */
  cursor?: () => unknown
}>()

/** Only devices with a precise, hover-capable pointer get the custom cursor. */
const DESKTOP_POINTER_QUERY = '(any-hover: hover) and (any-pointer: fine)'

const instanceId = Symbol('smooth-cursor')
const filterId = \`smooth-cursor-shadow-\${useId()}\`
const isEnabled = ref(false)
const isVisible = ref(false)
const isTopmost = computed(() => activeInstances[activeInstances.length - 1] === instanceId)

const cursorX = useSpring(0, computed(() => props.springConfig))
const cursorY = useSpring(0, computed(() => props.springConfig))
const rotation = useSpring(0, computed(() => ({ ...props.springConfig, damping: 60, stiffness: 300 })))
const scale = useSpring(1, computed(() => ({ ...props.springConfig, stiffness: 500, damping: 35 })))

let mediaQuery: MediaQueryList | null = null
let lastPosition = { x: 0, y: 0 }
let velocity = { x: 0, y: 0 }
let lastUpdateTime = Date.now()
let previousAngle = 0
let accumulatedRotation = 0
let frame = 0
let scaleTimeout: ReturnType<typeof setTimeout> | undefined

function updateEnabled() {
  isEnabled.value = mediaQuery?.matches ?? false
  if (!isEnabled.value) isVisible.value = false
}

function move(event: PointerEvent) {
  isVisible.value = true
  const now = Date.now()
  const position = { x: event.clientX, y: event.clientY }
  const elapsed = now - lastUpdateTime
  if (elapsed > 0) {
    velocity = { x: (position.x - lastPosition.x) / elapsed, y: (position.y - lastPosition.y) / elapsed }
  }
  lastUpdateTime = now
  lastPosition = position

  cursorX.set(position.x)
  cursorY.set(position.y)

  const speed = Math.hypot(velocity.x, velocity.y)
  if (speed > 0.1) {
    const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI) + 90
    let difference = angle - previousAngle
    if (difference > 180) difference -= 360
    if (difference < -180) difference += 360
    accumulatedRotation += difference
    rotation.set(accumulatedRotation)
    previousAngle = angle

    scale.set(0.95)
    clearTimeout(scaleTimeout)
    scaleTimeout = setTimeout(() => scale.set(1), 150)
  }
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch' || frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    move(event)
  })
}

function start() {
  activate(instanceId)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
}

function stop() {
  window.removeEventListener('pointermove', onPointerMove)
  cancelAnimationFrame(frame)
  frame = 0
  clearTimeout(scaleTimeout)
  deactivate(instanceId)
}

watch(isEnabled, (enabled) => (enabled ? start() : stop()))

onMounted(() => {
  mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)
  mediaQuery.addEventListener('change', updateEnabled)
  updateEnabled()
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', updateEnabled)
  stop()
})
<\/script>

<template>
  <motion.div
    v-if="isEnabled && isTopmost"
    aria-hidden="true"
    :style="{
      position: 'fixed',
      left: cursorX,
      top: cursorY,
      x: '-50%',
      y: '-50%',
      rotate: rotation,
      scale,
      zIndex: 100,
      pointerEvents: 'none',
      willChange: 'transform',
    }"
    :initial="false"
    :animate="{ opacity: isVisible ? 1 : 0 }"
    :transition="{ duration: 0.15 }"
  >
    <slot name="cursor">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="54" viewBox="0 0 50 54" fill="none" class="scale-50">
        <g :filter="\`url(#\${filterId})\`">
          <path
            d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
            fill="black"
          />
          <path
            d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
            stroke="white"
            stroke-width="2.25825"
          />
        </g>
        <defs>
          <filter :id="filterId" x="0.602397" y="0.952444" width="49.0584" height="52.428" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="2.25825" />
            <feGaussianBlur stdDeviation="2.25825" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
    </slot>
  </motion.div>
</template>
`;export{e as default};