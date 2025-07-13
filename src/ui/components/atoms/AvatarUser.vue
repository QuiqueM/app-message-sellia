<script lang="ts" setup>
interface Props {
  avatar: string
  name: string
  isOnline: boolean
}
defineProps<Props>()

const getInitials = (name: string): string => {
  const names = name.split(' ')
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }
  return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase()
}
</script>
<template>
  <!-- Avatar -->
  <div class="relative">
    <img v-if="avatar" :src="avatar" :alt="name" class="w-12 h-12 rounded-full object-cover" />
    <div v-else class="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-white">
      {{ getInitials(name) }}
    </div>
    <!-- Indicador de online -->
    <div
      v-if="isOnline"
      class="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-white dark:border-gray-800 rounded-full"
    ></div>
  </div>
</template>
