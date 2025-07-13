<script lang="ts" setup>
interface Props {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
}
defineProps<Props>()
</script>
<template>
  <div
    class="p-4 rounded-lg shadow-md"
    :class="{
      'bg-green-50 text-green-800': type === 'success',
      'bg-red-50 text-red-800': type === 'error',
      'bg-blue-50 text-blue-800': type === 'info',
      'bg-yellow-50 text-yellow-800': type === 'warning'
    }"
  >
    <p class="text-sm flex text-center">{{ message }}</p>
  </div>
</template>
