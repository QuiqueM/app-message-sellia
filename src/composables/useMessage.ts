import { inject } from 'vue'
import type { MessageProvider } from '@/dependencies/MessageProvider'
import { useMessageStore } from '@/stores/messages'
import { ChatMapper } from '@/modules/messages/adapters/mappers/ChatMapper'
import { Success } from '@/modules/shared/EasyResult'

export const useMessage = () => {
  const messageProvider = inject<MessageProvider>('messageProvider')
  const messageStore = useMessageStore()

  if (!messageProvider) {
    throw new Error('MessageProvider not found')
  }

  const getChatByUserId = async (userId: string): Promise<void> => {
    const messages = await messageProvider.getChatByUserIdUseCase.execute(userId)
    if (Success.check(messages)) {
      const conversation = ChatMapper.map(userId, messages.value!)
      messageStore.addConversation(conversation)
    }
  }

  return {
    getChatByUserId,
  }
}
