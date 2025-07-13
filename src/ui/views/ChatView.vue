<template>
  <div class="h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 flex">
    <!-- Sidebar - Lista de chats -->
    <ChatSidebar
      :chats="chats"
      :selected-chat="selectedChat"
      @select-chat="selectChat"
      @new-chat="createNewChat"
    />

    <!-- Chat principal -->
    <ChatMain
      v-if="selectedChat"
      :chat="selectedChat"
      :messages="currentMessages"
      @send-message="sendMessage"
    />

    <!-- Estado inicial cuando no hay chat seleccionado -->
    <div v-else class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div class="text-center">
        <div class="w-24 h-24 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          WhatsApp Web
        </h2>
        <p class="text-gray-500 dark:text-gray-400">
          Selecciona un chat para comenzar a mensajear
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ChatSidebar from '@components/chat/ChatSidebar.vue'
import ChatMain from '@components/chat/ChatMain.vue'
import type { Chat, Message } from '../../types/chat'

// Estado de la aplicación
const chats = ref<Chat[]>([
  {
    id: '1',
    name: 'Juan Pérez',
    avatar: '',
    lastMessage: 'Hola, ¿cómo estás?',
    lastMessageTime: '10:30',
    unreadCount: 2,
    isOnline: true
  },
  {
    id: '2',
    name: 'María García',
    avatar: '',
    lastMessage: 'Nos vemos mañana',
    lastMessageTime: '09:15',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: '3',
    name: 'Carlos López',
    avatar: '',
    lastMessage: 'Perfecto, gracias',
    lastMessageTime: 'Ayer',
    unreadCount: 1,
    isOnline: true
  }
])

const selectedChat = ref<Chat | null>(null)

// Mensajes del chat seleccionado
const currentMessages = ref<Message[]>([
  {
    id: '1',
    text: 'Hola, ¿cómo estás?',
    timestamp: '10:30',
    isOwn: false,
    status: 'read'
  },
  {
    id: '2',
    text: '¡Hola! Muy bien, gracias. ¿Y tú?',
    timestamp: '10:32',
    isOwn: true,
    status: 'read'
  },
  {
    id: '3',
    text: 'Perfecto, ¿qué planes tienes para hoy?',
    timestamp: '10:33',
    isOwn: false,
    status: 'read'
  }
])

// Métodos
const selectChat = (chat: Chat) => {
  selectedChat.value = chat
  // Marcar mensajes como leídos
  chat.unreadCount = 0
}

const sendMessage = (text: string) => {
  if (!selectedChat.value) return

  const newMessage: Message = {
    id: Date.now().toString(),
    text,
    timestamp: new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    isOwn: true,
    status: 'sent'
  }

  currentMessages.value.push(newMessage)

  // Simular respuesta después de 2 segundos
  setTimeout(() => {
    const reply: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Mensaje recibido 👍',
      timestamp: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      isOwn: false,
      status: 'read'
    }
    currentMessages.value.push(reply)
  }, 2000)
}

const createNewChat = () => {
  // Lógica para crear nuevo chat
  console.log('Crear nuevo chat')
}
</script>
