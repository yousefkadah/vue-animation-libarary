import { inject, type Component, type InjectionKey, type Ref } from 'vue'

export interface TreeViewElement {
  id: string
  name: string
  /** Explicit node type. Use `"folder"` for empty folders; otherwise nodes with `children` are folders. */
  type?: 'file' | 'folder'
  isSelectable?: boolean
  children?: TreeViewElement[]
}

export type TreeSortMode = 'default' | 'none' | ((a: TreeViewElement, b: TreeViewElement) => number)

export interface TreeContext {
  selectedId: Readonly<Ref<string | undefined>>
  expandedItems: Readonly<Ref<string[] | undefined>>
  indicator: Readonly<Ref<boolean>>
  openIcon: Readonly<Ref<Component | undefined>>
  closeIcon: Readonly<Ref<Component | undefined>>
  direction: Readonly<Ref<'rtl' | 'ltr'>>
  handleExpand: (id: string) => void
  selectItem: (id: string) => void
  setExpandedItems: (items: string[] | undefined) => void
}

export const treeKey: InjectionKey<TreeContext> = Symbol('Tree')

export function useTree(): TreeContext {
  const context = inject(treeKey, null)
  if (!context) throw new Error('Folder, File and CollapseButton must be used inside a <Tree>.')
  return context
}

export function isFolderElement(element: TreeViewElement): boolean {
  if (element.type) return element.type === 'folder'
  return Array.isArray(element.children)
}

export function mergeExpandedItems(currentItems: string[] | undefined, nextItems: string[]): string[] {
  return [...new Set([...(currentItems ?? []), ...nextItems])]
}

const treeCollator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

/** Folders first, then natural alphabetical order. */
export function defaultTreeComparator(a: TreeViewElement, b: TreeViewElement): number {
  const aIsFolder = isFolderElement(a)
  const bIsFolder = isFolderElement(b)
  if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1
  return treeCollator.compare(a.name, b.name)
}

export function sortTreeElements(elements: TreeViewElement[], sort: TreeSortMode): TreeViewElement[] {
  const comparator = sort === 'none' ? undefined : sort === 'default' ? defaultTreeComparator : sort
  const nextElements = elements.map((element) =>
    Array.isArray(element.children) ? { ...element, children: sortTreeElements(element.children, sort) } : element,
  )
  return comparator ? [...nextElements].sort(comparator) : nextElements
}
