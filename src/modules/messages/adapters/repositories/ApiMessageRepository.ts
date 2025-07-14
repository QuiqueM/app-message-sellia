import type { Message } from "@/modules/messages/domain/Message";
import type { MessageRepository } from "@/modules/messages/domain/ports/MessageRepository";
import type { FetchInstance } from "@/modules/shared/GlobalFetch";

export class ApiMessageRepository implements MessageRepository {
  constructor(private readonly http: FetchInstance) {}

  async getChatByUserId(userId: string): Promise<Message[]> {
    try {
      const response = await this.http.get<Message[]>(`/${userId}.json`);
      console.log('Messages fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }
}
