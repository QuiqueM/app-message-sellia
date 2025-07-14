import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().optional(), // ID opcional, puede ser generado por el backend
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(50, 'El nombre no puede exceder los 50 caracteres')
    .min(4, 'El nombre debe tener al menos 4 caracteres'),
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('El correo electrónico no es válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export const FormUserRegisterSchema = UserSchema.extend({
  confirmPassword: z
    .string()
    .min(1, 'La confirmación de contraseña es requerida')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export const FormUserLoginSchema = UserSchema.pick({
  email: true,
  password: true,
})

export type User = z.infer<typeof UserSchema>
export type FormUserRegister = z.infer<typeof FormUserRegisterSchema>
export type FormUserLogin = z.infer<typeof FormUserLoginSchema>

