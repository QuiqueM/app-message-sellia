<script lang="ts" setup>
import IconButton from '@components/atoms/IconButton.vue'
import Avatar from '@components/atoms/AvatarUser.vue'

interface Props {
  avatar: string
  name: string
  isOnline: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
    <div class="flex items-center">
      <Avatar :avatar="avatar" :name="name" :is-online="isOnline" />

      <!-- Información del contacto -->
      <div class="ml-3 flex-1">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ name }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ isOnline ? 'En línea' : 'Desconectado' }}
        </p>
      </div>

      <!-- Botones de acción -->
      <div class="flex items-center space-x-2">
        <icon-button icon="phone" />
        <icon-button icon="camera" />
        <icon-button icon="dot" />
      </div>
    </div>
  </div>
</template>
