import { ref, watch } from 'vue'

function readStoredTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export const theme = ref<'light' | 'dark'>(readStoredTheme())

watch(theme, (value) => {
  document.documentElement.classList.toggle('dark', value === 'dark')
  try {
    localStorage.setItem('theme', value)
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this visit.
  }
})

/** Components such as AnimatedThemeToggler flip the class directly — keep the header icon in sync. */
if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
  new MutationObserver(() => {
    const current = readStoredTheme()
    if (current !== theme.value) theme.value = current
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
}

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

export const commandMenuOpen = ref(false)
export const mobileNavOpen = ref(false)
