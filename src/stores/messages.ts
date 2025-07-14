import { defineStore } from "pinia";
import { ref } from "vue";
import type { Conversation, Message } from "@/types/chat";

export const useMessageStore = defineStore('message', () => {
  const conversations = ref<Conversation[]>([]);

  const addConversation = (conversation: Conversation) => {
    conversations.value.push(conversation);
  }

  const findConversationByClientId = (clientId: string): Conversation | undefined => {
    return conversations.value.find(conversation => conversation.clientId === clientId);
  }

  const addMessageToConversation = (clientId: string, message: Message) => {
    const conversation = findConversationByClientId(clientId)
    if (conversation) {
      conversation.messages.push(message)
    } else {
      const newConversation: Conversation = {
        clientId,
        messages: [message],
      }
      addConversation(newConversation)
    }
  }

  return {
    addConversation,
    findConversationByClientId,
    addMessageToConversation,
  }
})

