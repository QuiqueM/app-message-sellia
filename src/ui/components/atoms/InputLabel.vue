<script lang="ts" setup>
interface Props {
  label: string
  inputId?: string
}

defineProps<Props>()
</script>
<template>
  <label
    :for="inputId"
    class="block text-sm font-medium text-gray-700 mb-2"
  >
    {{ label }}
  </label>
</template>
