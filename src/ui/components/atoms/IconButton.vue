<script lang="ts" setup>
import Icon from '@/ui/components/icons/IconComponent.vue'

interface Props {
  icon: string
  disabled?: boolean
}
defineProps<Props>()
</script>

<template>
  <button
    :class="[
      'p-2 text-gray-600 dark:text-gray-300 rounded-full transition-colors',
      disabled ? 'cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700 '
    ]"
    :disabled="disabled"
  >
    <icon :icon-name="icon" />
  </button>
</template>
