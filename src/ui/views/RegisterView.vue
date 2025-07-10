<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
    <div class="max-w-md w-full space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Crear Cuenta</h2>
          <p class="text-gray-600 dark:text-gray-300">Completa el formulario para registrarte</p>
        </div>

        <!-- Register Form -->
        <Form :validation-schema="registerSchema" @submit="onSubmit" class="space-y-6">
          <!-- Name Field -->
          <InputText
            name="name"
            type="text"
            label="Nombre Completo"
            placeholder="Tu nombre completo"
            focus-ring-color="focus:ring-green-500"
          />

          <!-- Email Field -->
          <InputText
            name="email"
            type="email"
            label="Correo Electrónico"
            placeholder="tu@email.com"
            focus-ring-color="focus:ring-green-500"
          />

          <!-- Password Field -->
          <InputText
            name="password"
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            focus-ring-color="focus:ring-green-500"
          />

          <!-- Confirm Password Field -->
          <InputText
            name="confirmPassword"
            type="password"
            label="Confirmar Contraseña"
            placeholder="••••••••"
            focus-ring-color="focus:ring-green-500"
          />

          <!-- Submit Button -->
          <Button type="submit" variant="primary">
            Crear Cuenta
          </Button>
        </Form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-300">
            ¿Ya tienes una cuenta?
            <RouterLink to="/login" class="text-green-600 dark:text-green-400 hover:text-green-700 font-medium">
              Inicia sesión aquí
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useRouter } from 'vue-router'
import InputText from '../components/InputText.vue'
import Button from '../components/Button.vue'

const router = useRouter()

// Schema de validación con Zod
const registerSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, 'El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z
      .string()
      .min(1, 'El correo electrónico es requerido')
      .email('Ingresa un correo electrónico válido'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'Confirma tu contraseña')
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
)

// Función para manejar el envío del formulario
const onSubmit = async (values: Record<string, string>) => {
  try {
    console.log('Datos del formulario:', values)
    // Aquí iría la lógica de registro
    // Por ahora solo simulamos un delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirigir al login después del registro exitoso
    router.push('/login')
  } catch (error) {
    console.error('Error en el registro:', error)
  }
}
</script> 