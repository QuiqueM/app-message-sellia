<script lang="ts" setup>
import Icon from '@components/icons/IconComponent.vue'

interface Props {
  placeholder?: string
}

defineProps<Props>()

const searchQuery = defineModel<string>('')
</script>

<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:bg-white dark:focus:bg-gray-600"
    />
    <icon icon-name="search" />
  </div>
</template>
