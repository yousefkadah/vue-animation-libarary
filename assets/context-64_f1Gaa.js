var e=`import { Comment, isVNode, type InjectionKey, type Ref, type VNodeChild } from 'vue'

export interface TerminalSequenceContext {
  /** Whether the terminal plays its lines one after another. */
  enabled: Readonly<Ref<boolean>>
  /** Whether the sequence may begin (it is enabled and, with \`startOnView\`, visible). */
  started: Readonly<Ref<boolean>>
  /** Index of the line that is currently allowed to play. */
  activeIndex: Readonly<Ref<number>>
  /** Claims the next position in the sequence. Lines call this once, in render order. */
  register: () => number
  /** Marks a line as finished so the next one can start. */
  completeItem: (index: number) => void
}

export const terminalSequenceKey: InjectionKey<TerminalSequenceContext | null> = Symbol('TerminalSequence')

/** Concatenates the text inside slot content (text nodes, fragments and plain elements). */
export function slotText(node: VNodeChild): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map((child) => slotText(child as VNodeChild)).join('')
  if (isVNode(node)) {
    if (node.type === Comment) return ''
    const { children } = node
    if (typeof children === 'string' || Array.isArray(children)) return slotText(children as VNodeChild)
  }
  return ''
}
`;export{e as default};