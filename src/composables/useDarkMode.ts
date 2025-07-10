import { ref, watch } from 'vue'
import type { Ref } from 'vue'


export function useDarkMode() {

  const isDark: Ref<boolean> = ref(
  localStorage.getItem('theme') === 'dark' ||
  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
)
  const getisDarkTheme = () => {
    return localStorage.getItem('theme') === 'dark'
  }

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, () => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.toggle("dark");
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})

  return { getisDarkTheme , isDark, toggleDarkMode}
} 