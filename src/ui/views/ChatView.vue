<template>
  <div class="h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 flex">
    <!-- Sidebar - Lista de chats -->
    <ChatSidebar
      v-if="showChatSidebar"
      :chats="chats"
      :selected-chat="selectedChat"
      :loading="loading"
      @select-chat="selectChat"
      @new-chat="createNewChat"
    />

    <!-- Chat principal -->
    <ChatMain
      v-if="selectedChat"
      :chat="selectedChat"
      :messages="currentMessages"
      @send-message="sendMessage"
      @return-chats="returnChats"
    />

    <!-- Estado inicial cuando no hay chat seleccionado -->
    <div v-else class="hidden flex-1 md:flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div class="text-center">
        <div
          class="w-24 h-24 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center"
        >
          <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Sellia Chat</h2>
        <p class="text-gray-500 dark:text-gray-400">{{ $t('chat.selectForStartMessage') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ChatSidebar from '@components/molecules/chat/ChatSidebar.vue'
import ChatMain from '@components/molecules/chat/ChatMain.vue'
import type { Chat, Message } from '@/types/chat'
import { useCustomer } from '@/composables/useCustomer'
import { useMessage } from '@/composables/useMessage'
import { useMessageStore } from '@/stores/messages'
import { useDeviceType } from '@/composables/useDeviceType'

const { getAllCustomers } = useCustomer()
const { getChatByUserId } = useMessage()
const messageStore = useMessageStore()
const { isMobile } = useDeviceType()

// Estado de la aplicación
const chats = ref<Chat[]>([])
const selectedChat = ref<Chat | null>(null)
const loading = ref(false)

// Mensajes del chat seleccionado
const currentMessages = ref<Message[]>([])

const showChatSidebar = computed(() => {
  return isMobile.value ? !selectedChat.value : true
})

// Métodos
const selectChat = async (chat: Chat) => {
  selectedChat.value = chat
  chat.unreadCount = 0

  // Verificar si la conversación ya existe en el store
  const conversation = messageStore.findConversationByClientId(chat.id)
  if (conversation) {
    currentMessages.value = conversation.messages
  } else {
    // Si no existe, pedirla y luego actualizar los mensajes
    await getChatByUserId(chat.id)
    const newConversation = messageStore.findConversationByClientId(chat.id)
    currentMessages.value = newConversation ? newConversation.messages : []
  }
}

const sendMessage = (text: string) => {
  if (!selectedChat.value) return

  const newMessage: Message = {
    id: Date.now().toString(),
    text,
    timestamp: new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    isOwn: true,
    status: 'sent',
  }

  messageStore.addMessageToConversation(selectedChat.value.id, newMessage)

  // Simular respuesta después de 2 segundos
  setTimeout(() => {
    const reply: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Mensaje recibido 👍',
      timestamp: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwn: false,
      status: 'read',
    }
    messageStore.addMessageToConversation(selectedChat.value!.id, reply)
  }, 2000)
}

const returnChats = () => {
  selectedChat.value = null
}

const createNewChat = () => {
  // Lógica para crear nuevo chat
  console.log('Crear nuevo chat')
}

onMounted(async () => {
  // Cargar clientes al iniciar
  loading.value = true
  const customers = await getAllCustomers()
  chats.value = customers.map((customer) => ({
    id: customer._id,
    name: customer.name,
    avatar: '',
    lastMessage: 'Muchas gracias',
    lastMessageTime: 'Ahora',
    unreadCount: Math.floor(Math.random() * 5) + 1,
    isOnline: true,
  }))
  loading.value = false
})
</script>
