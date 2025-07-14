import type { Message } from "../Message";

export interface MessageRepository {
  getChatByUserId(userId: string): Promise<Message[]>;
}
