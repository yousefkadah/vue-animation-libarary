import { ref, computed, watch, onUnmounted, type Ref } from 'vue'

export interface GestureState {
  down: boolean
  xy: [number, number]
  movement: [number, number]
  velocity: [number, number]
  direction: [number, number]
  distance: number
  cancel: () => void
  event?: Event
}

export interface GestureOptions {
  enabled?: boolean
  threshold?: number
  rubberband?: boolean
  axis?: 'x' | 'y' | 'xy'
  bounds?: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }
  onDrag?: (state: GestureState) => void
  onDragStart?: (state: GestureState) => void
  onDragEnd?: (state: GestureState) => void
}

/**
 * Modern gesture recognition hook inspired by @use-gesture/react
 * Provides drag, pinch, and other gesture interactions
 */
export function useGesture(
  target: Ref<HTMLElement | null>,
  options: GestureOptions = {}
) {
  const isDown = ref(false)
  const startPos = ref<[number, number]>([0, 0])
  const currentPos = ref<[number, number]>([0, 0])
  const movement = ref<[number, number]>([0, 0])
  const velocity = ref<[number, number]>([0, 0])
  const lastTime = ref(0)
  const lastPos = ref<[number, number]>([0, 0])
  
  let cancelGesture = false
  
  const getEventPos = (event: MouseEvent | TouchEvent): [number, number] => {
    if ('touches' in event) {
      return event.touches[0] ? [event.touches[0].clientX, event.touches[0].clientY] : [0, 0]
    }
    return [event.clientX, event.clientY]
  }
  
  const calculateVelocity = (pos: [number, number], time: number): [number, number] => {
    const dt = time - lastTime.value
    if (dt === 0) return [0, 0]
    
    const dx = pos[0] - lastPos.value[0]
    const dy = pos[1] - lastPos.value[1]
    
    return [dx / dt, dy / dt]
  }
  
  const applyBounds = (pos: [number, number]): [number, number] => {
    if (!options.bounds) return pos
    
    let [x, y] = pos
    const bounds = options.bounds
    
    if (bounds.left !== undefined) x = Math.max(x, bounds.left)
    if (bounds.right !== undefined) x = Math.min(x, bounds.right)
    if (bounds.top !== undefined) y = Math.max(y, bounds.top)
    if (bounds.bottom !== undefined) y = Math.min(y, bounds.bottom)
    
    return [x, y]
  }
  
  const createState = (event?: Event): GestureState => ({
    down: isDown.value,
    xy: currentPos.value,
    movement: movement.value,
    velocity: velocity.value,
    direction: [
      movement.value[0] > 0 ? 1 : movement.value[0] < 0 ? -1 : 0,
      movement.value[1] > 0 ? 1 : movement.value[1] < 0 ? -1 : 0
    ],
    distance: Math.sqrt(movement.value[0] ** 2 + movement.value[1] ** 2),
    cancel: () => { cancelGesture = true },
    event
  })
  
  const onPointerDown = (event: MouseEvent | TouchEvent) => {
    if (!(options.enabled ?? true)) return
    
    event.preventDefault()
    const pos = getEventPos(event)
    
    isDown.value = true
    startPos.value = pos
    currentPos.value = pos
    movement.value = [0, 0]
    velocity.value = [0, 0]
    lastTime.value = performance.now()
    lastPos.value = pos
    cancelGesture = false
    
    options.onDragStart?.(createState(event))
  }
  
  const onPointerMove = (event: MouseEvent | TouchEvent) => {
    if (!isDown.value || cancelGesture) return
    
    event.preventDefault()
    const pos = getEventPos(event)
    const time = performance.now()
    
    currentPos.value = pos
    movement.value = [pos[0] - startPos.value[0], pos[1] - startPos.value[1]]
    
    // Apply axis constraints
    if (options.axis === 'x') movement.value[1] = 0
    if (options.axis === 'y') movement.value[0] = 0
    
    // Apply bounds
    const boundedPos = applyBounds(movement.value)
    movement.value = boundedPos
    
    // Calculate velocity
    velocity.value = calculateVelocity(pos, time) as [number, number]
    
    lastTime.value = time
    lastPos.value = pos
    
    // Check threshold
    const distance = Math.sqrt(movement.value[0] ** 2 + movement.value[1] ** 2)
    if (distance > (options.threshold ?? 0)) {
      options.onDrag?.(createState(event))
    }
  }
  
  const onPointerUp = (event: MouseEvent | TouchEvent) => {
    if (!isDown.value) return
    
    isDown.value = false
    options.onDragEnd?.(createState(event))
    
    // Reset state
    setTimeout(() => {
      movement.value = [0, 0]
      velocity.value = [0, 0]
    }, 0)
  }
  
  // Event listeners setup
  const addEventListeners = (element: HTMLElement) => {
    // Mouse events
    element.addEventListener('mousedown', onPointerDown)
    document.addEventListener('mousemove', onPointerMove)
    document.addEventListener('mouseup', onPointerUp)
    
    // Touch events
    element.addEventListener('touchstart', onPointerDown, { passive: false })
    document.addEventListener('touchmove', onPointerMove, { passive: false })
    document.addEventListener('touchend', onPointerUp)
  }
  
  const removeEventListeners = (element: HTMLElement) => {
    element.removeEventListener('mousedown', onPointerDown)
    document.removeEventListener('mousemove', onPointerMove)
    document.removeEventListener('mouseup', onPointerUp)
    
    element.removeEventListener('touchstart', onPointerDown)
    document.removeEventListener('touchmove', onPointerMove)
    document.removeEventListener('touchend', onPointerUp)
  }
  
  watch(target, (newTarget, oldTarget) => {
    if (oldTarget) {
      removeEventListeners(oldTarget)
    }
    if (newTarget) {
      addEventListeners(newTarget)
    }
  }, { immediate: true })
  
  onUnmounted(() => {
    if (target.value) {
      removeEventListeners(target.value)
    }
  })
  
  return {
    state: computed(() => createState()),
    isDown: computed(() => isDown.value),
    movement: computed(() => movement.value),
    velocity: computed(() => velocity.value)
  }
}