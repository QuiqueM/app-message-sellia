import type { Message } from "@/modules/messages/domain/Message";
import type { MessageRepository } from "@/modules/messages/domain/ports/MessageRepository";
import type { FetchInstance } from "@/modules/shared/GlobalFetch";
import { Success, Failure } from '@/modules/shared/EasyResult'
import { HttpError } from '@/modules/shared/HttpError'

export class ApiMessageRepository implements MessageRepository {
  constructor(private readonly http: FetchInstance) {}

  async getChatByUserId(userId: string): Promise<Success<Message[]> | Failure<HttpError>> {
    try {
      const response = await this.http.get<Message[]>(`/${userId}.json`);
      return Success.create(response)
    } catch (error) {
      console.error('Error fetching messages:', error);
      return Failure.create(new HttpError(500, 'error fetching messages'))
    }
  }
}
