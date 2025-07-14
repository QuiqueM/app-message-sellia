import type { Message } from "@/modules/messages/domain/Message";
import type { MessageRepository } from "@/modules/messages/domain/ports/MessageRepository";

export class GetChatByUserId {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(userId: string): Promise<Message[]> {
    return await this.messageRepository.getChatByUserId(userId);
  }
}
