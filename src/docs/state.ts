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

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

export const commandMenuOpen = ref(false)
export const mobileNavOpen = ref(false)
