var e=`import type { InjectionKey, Ref } from 'vue'
import type { MotionValue } from 'motion-v'

export const DEFAULT_SIZE = 40
export const DEFAULT_MAGNIFICATION = 60
export const DEFAULT_DISTANCE = 140

export interface DockContext {
  /** Horizontal pointer position (client X), \`Infinity\` while the pointer is outside the dock. */
  mouseX: MotionValue<number>
  iconSize: Readonly<Ref<number>>
  iconMagnification: Readonly<Ref<number>>
  iconDistance: Readonly<Ref<number>>
  disableMagnification: Readonly<Ref<boolean>>
}

export const dockKey: InjectionKey<DockContext> = Symbol('Dock')
`;export{e as default};