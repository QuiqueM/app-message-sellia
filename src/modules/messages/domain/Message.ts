import { z } from 'zod'

export const MessageSchema = z.object({
  _id: z.string(),
  type: z.enum(['Message']),
  createdAt: z.string().datetime(),
  client: z.string(),
  message: z.object({
    _id: z.string(),
    type: z.enum(['text']),
    text: z.string(),
    user: z.string(),
    typeUser: z.enum(['UserSystem', 'User', 'Client']),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
})

export type Message = z.infer<typeof MessageSchema>
