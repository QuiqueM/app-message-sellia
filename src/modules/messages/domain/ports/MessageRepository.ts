import { Success, Failure } from '@/modules/shared/EasyResult'
import { HttpError } from '@/modules/shared/HttpError'
import type { Message } from '../Message'

export interface MessageRepository {
  getChatByUserId(userId: string): Promise<Success<Message[]> | Failure<HttpError>>
}
