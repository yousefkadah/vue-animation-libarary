var e=`<script setup lang="ts">
import { DottedMap, type DottedMapMarker } from '@/components/ui/dotted-map'

type CityMarker = DottedMapMarker & { label: string }

const markers: CityMarker[] = [
  { lat: 37.5665, lng: 126.978, size: 2.8, label: 'Seoul' },
  { lat: 40.7128, lng: -74.006, size: 2.8, label: 'NYC' },
]
<\/script>

<template>
  <div class="relative h-[320px] w-full overflow-hidden rounded-lg border">
    <div class="absolute inset-0 bg-radial from-transparent to-background to-200%" />
    <DottedMap :markers="markers">
      <template #marker-overlay="{ marker, x, y, r }">
        <g class="pointer-events-none">
          <circle :cx="x" :cy="y" :r="r * 0.45" fill="white" />
          <rect
            :x="x + r * 1.6"
            :y="y - r * 0.75"
            :width="marker.label.length * r * 0.56 + r * 1.4"
            :height="r * 1.5"
            :rx="r * 0.75"
            fill="rgba(0,0,0,0.55)"
          />
          <text :x="x + r * 2.3" :y="y + r * 0.32" :font-size="r * 0.9" fill="white">{{ marker.label }}</text>
        </g>
      </template>
    </DottedMap>
  </div>
</template>
`;export{e as default};