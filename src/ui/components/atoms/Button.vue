<template>
  <button
    :type="type"
    :disabled="disabled"
    class="w-full py-3 px-4 rounded-lg font-medium focus:ring-2 focus:ring-offset-2 transition duration-200"
    :class="[
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
  >
    <slot  />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false
})

// Clases CSS según la variante
const variantClasses = computed(() => {
  const baseClasses = 'text-white'

  switch (props.variant) {
    case 'primary':
      return `${baseClasses} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`
    case 'secondary':
      return `${baseClasses} bg-gray-600 hover:bg-gray-700 focus:ring-gray-500`
    case 'success':
      return `${baseClasses} bg-green-600 hover:bg-green-700 focus:ring-green-500`
    case 'danger':
      return `${baseClasses} bg-red-600 hover:bg-red-700 focus:ring-red-500`
    default:
      return `${baseClasses} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`
  }
})

// Exportar el componente
defineOptions({
  name: 'AppButton'
})
</script>
