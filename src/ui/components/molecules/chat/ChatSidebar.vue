<template>
  <div class="w-full md:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
    <!-- Header del sidebar -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Chats</h1>
        <icon-button icon="plus" class="ml-2" @click="$emit('new-chat')" />
      </div>

      <!-- Barra de búsqueda -->
      <div class="mt-4 ">
        <input-search v-model="searchQuery" :placeholder="$t('chat.findOrCreateChat')" />
      </div>
    </div>

    <!-- Lista de chats -->
    <div class="flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
      <template v-if="loading">
        <div v-for="n in 3" :key="n" class="flex items-center p-4 animate-pulse">
          <!-- Skeleton Avatar -->
          <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <!-- Skeleton Info -->
          <div class="ml-3 flex-1 min-w-0">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-1"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="chat in filteredChats"
          :key="chat.id"
          @click="$emit('select-chat', chat)"
          class="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          :class="{ 'bg-gray-100 dark:bg-gray-700': selectedChat?.id === chat.id }"
        >
          <Avatar :avatar="chat.avatar" :name="chat.name" :isOnline="chat.isOnline" />
          <!-- Información del chat -->
          <div class="ml-3 flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ chat.name }}
              </h3>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ chat.lastMessageTime }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-1">
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                {{ chat.lastMessage }}
              </p>
              <!-- Contador de mensajes no leídos -->
              <counter-message :count="chat.unreadCount" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Chat } from '@/types/chat'
import IconButton from '@components/atoms/IconButton.vue';
import Avatar from '@components/atoms/AvatarUser.vue'
import CounterMessage from '@components/atoms/CounterMessage.vue'
import InputSearch from '@components/molecules/InputSearch.vue'

const props = defineProps<{
  chats: Chat[]
  selectedChat: Chat | null
  loading: boolean
}>()

defineEmits<{
  'select-chat': [chat: Chat]
  'new-chat': []
}>()

const searchQuery = ref('')

const filteredChats = computed(() => {
  if (!searchQuery.value) return props.chats

  return props.chats.filter((chat: Chat) =>
    chat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
