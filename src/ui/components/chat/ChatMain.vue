<template>
  <div class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
    <!-- Header del chat -->
    <HeaderChat :avatar="chat.avatar" :name="chat.name" :is-online="chat.isOnline" />

    <!-- Área de mensajes -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex"
        :class="message.isOwn ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg"
          :class="message.isOwn
            ? 'bg-primary text-white'
            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'"
        >
          <p class="text-sm">{{ message.text }}</p>
          <div class="flex items-center justify-end mt-1 space-x-1">
            <span class="text-xs opacity-70">
              {{ message.timestamp }}
            </span>
            <!-- Estado del mensaje (solo para mensajes propios) -->
            <div v-if="message.isOwn" class="flex items-center">
              <svg
                v-if="message.status === 'sent'"
                class="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <svg
                v-else-if="message.status === 'delivered'"
                class="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <svg
                v-else-if="message.status === 'read'"
                class="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <bar-send-message
      @on-send-message="sendMessage"
    />
  </div>
</template>

<script setup lang="ts">
import type { Chat, Message } from '@/types/chat'
import HeaderChat from '@components/molecules/HeaderChat.vue';
import BarSendMessage from '@components/molecules/BarSendMessage.vue';
import { ref, watch, nextTick } from 'vue';


const props = defineProps<{ chat: Chat; messages: Message[] }>()

const emit = defineEmits<{
  'send-message': [text: string]
}>()

const messagesContainer = ref<HTMLElement | null>(null);

watch(
  () => props.messages,
  async () => {
    await nextTick();
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  },
  { deep: true }
);

const sendMessage = (message: string) => {
  if (!message.trim()) return
  emit('send-message', message)
}
</script>
