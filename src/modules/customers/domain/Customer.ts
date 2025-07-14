import { z } from 'zod'

export const CustomerSchema = z.object({
  _id: z.string(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Customer = z.infer<typeof CustomerSchema>
