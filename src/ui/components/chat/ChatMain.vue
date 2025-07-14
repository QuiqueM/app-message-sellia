<template>
  <div class="flex-1 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
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
