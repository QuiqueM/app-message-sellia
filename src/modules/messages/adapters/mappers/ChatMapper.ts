import type { Conversation } from '@/types/chat'
import type { Message } from "@/modules/messages/domain/Message";

enum TypeOwn {
  CLIENT = 'Client',
}

export class ChatMapper {
  static map(clientId: string, messages: Message[]): Conversation {
    return {
      clientId,
      messages: messages.map((message) => {
        return {
          id: message.message._id,
          text: message.message.text,
          timestamp: new Date(message.message.createdAt).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isOwn: message.message.typeUser !== TypeOwn.CLIENT,
          status: 'sent',
        }
      })
    }

  }
}
