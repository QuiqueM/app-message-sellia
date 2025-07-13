<script lang="ts" setup>
import { ref } from 'vue'
import IconButton from '@components/atoms/IconButton.vue'
import Icon from '@/ui/components/icons/IconComponent.vue'

const emits = defineEmits<{
  'on-send-message': [message: string]
}>()
const newMessage = ref<string>('')

const sendMessage = () => {
  if (newMessage.value.trim()) {
    emits('on-send-message', newMessage.value.trim())
    newMessage.value = ''
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
    <div class="flex items-center space-x-2">
      <icon-button icon="emoji" />
      <icon-button icon="clip" />

      <!-- Input de texto -->
      <div class="flex-1 relative">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Escribe un mensaje"
          class="w-full pl-4 pr-12 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:bg-white dark:focus:bg-gray-600"
          @keyup.enter="sendMessage"
        />
      </div>

      <!-- Botón de enviar -->
      <button
        @click="sendMessage"
        :disabled="!newMessage.trim()"
        class="p-2 bg-primary text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <icon icon-name="send" />
      </button>
    </div>
  </div>
</template>
