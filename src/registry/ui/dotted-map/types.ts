import type { HTMLAttributes } from 'vue'

export interface DottedMapMarker {
  lat: number
  lng: number
  /** Marker radius in map units. Falls back to `dotRadius`. */
  size?: number
  /** Override the map-wide `pulse` setting for this marker. */
  pulse?: boolean
}

/** A marker after placement: `lat` / `lng` are replaced by its snapped `x` / `y` in map units. */
export type DottedMapPlacedMarker<M extends DottedMapMarker = DottedMapMarker> = Omit<M, 'lat' | 'lng'> & {
  x: number
  y: number
}

export interface DottedMapProps<M extends DottedMapMarker = DottedMapMarker> {
  class?: HTMLAttributes['class']
  /** Width of the SVG viewBox. */
  width?: number
  /** Height of the SVG viewBox. */
  height?: number
  /** Number of grid cells sampled across the map; more samples means more, closer-spaced dots. */
  mapSamples?: number
  markers?: M[]
  /** Fill of the land dots. Defaults to `currentColor`, so `text-*` classes colour the map. */
  dotColor?: string
  markerColor?: string
  dotRadius?: number
  /** Offset every other row by half a dot for a honeycomb pattern. */
  stagger?: boolean
  /** Pulse every marker (a marker can opt out with `pulse: false`). */
  pulse?: boolean
}

/** Scope of the `marker-overlay` slot. */
export interface DottedMapMarkerOverlayScope<M extends DottedMapMarker = DottedMapMarker> {
  marker: DottedMapPlacedMarker<M>
  index: number
  x: number
  y: number
  r: number
}
