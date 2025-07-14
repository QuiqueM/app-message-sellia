import type { FetchInstance } from '@/modules/shared/GlobalFetch'
import { ApiMessageRepository } from '@/modules/messages/adapters/repositories/ApiMessageRepository'
import { GetChatByUserId } from '@/modules/messages/application/useCases/GetChatByUserId';

export interface MessageProvider {
  getChatByUserIdUseCase: GetChatByUserId;
}

export function messageProvider(fetchInstance: FetchInstance): MessageProvider {
  const messageRepository = new ApiMessageRepository(fetchInstance);
  const getChatByUserIdUseCase = new GetChatByUserId(messageRepository);

  return {
    getChatByUserIdUseCase,
  };
}
