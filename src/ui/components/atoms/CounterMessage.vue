<script lang="ts" setup>
interface Props {
  count: number
}

defineProps<Props>()
</script>

<template>
  <div
    v-if="count > 0"
    class="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
  >
    {{ count }}
  </div>
</template>
