import { ref, computed } from 'vue'

// Estado global para mantener una única instancia
const globalDeviceType = ref('desktop')
let isInitialized = false

export function useDeviceType() {
  const checkDeviceType = () => {
    const width = window.innerWidth

    if (width < 768) {
      globalDeviceType.value = 'mobile'
    } else if (width >= 768 && width < 1024) {
      globalDeviceType.value = 'tablet'
    } else {
      globalDeviceType.value = 'desktop'
    }
  }

  const isMobile = computed(() => globalDeviceType.value === 'mobile')
  const isTablet = computed(() => globalDeviceType.value === 'tablet')
  const isDesktop = computed(() => globalDeviceType.value === 'desktop')

  // Solo inicializa el listener una vez
  if (!isInitialized && typeof window !== 'undefined') {
    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
    isInitialized = true
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
  }
}
