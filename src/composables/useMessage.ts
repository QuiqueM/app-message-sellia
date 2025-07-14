import { inject } from "vue";
import type { MessageProvider } from "@/dependencies/MessageProvider";
import { useMessageStore } from "@/stores/messages";
import { ChatMapper } from "@/modules/messages/adapters/mappers/ChatMapper";

export const useMessage = () => {
  const messageProvider = inject<MessageProvider>('messageProvider');
  const messageStore = useMessageStore();

  if (!messageProvider) {
    throw new Error('MessageProvider not found');
  }

  const getChatByUserId = async (userId: string): Promise<void> => {
    try {
      const messages = await messageProvider.getChatByUserIdUseCase.execute(userId);
      const conversation = ChatMapper.map(userId, messages);
      console.log('Chat fetched successfully:', conversation);
      messageStore.addConversation(conversation);
    } catch (error) {
      console.error('Error fetching chat by user ID:', error);
      throw new Error('Failed to fetch chat');
    }
  };

  return {
    getChatByUserId,
  };
};
