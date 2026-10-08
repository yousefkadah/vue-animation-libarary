var e=`import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { Options as ConfettiOptions } from 'canvas-confetti'

/** What \`<Confetti>\` exposes through its template ref and to its slot content. */
export interface ConfettiRef {
  /** Fires a burst on the component's canvas. Per-call options override the \`options\` prop. */
  fire: (options?: ConfettiOptions) => Promise<void>
}

export const CONFETTI_INJECTION_KEY: InjectionKey<ConfettiRef> = Symbol('confetti')

/** Access the nearest \`<Confetti>\` from inside its default slot. Returns \`null\` outside one. */
export function useConfetti(): ConfettiRef | null {
  return inject(CONFETTI_INJECTION_KEY, null)
}
`;export{e as default};