<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
    <div class="max-w-md w-full space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Iniciar Sesión</h2>
          <p class="text-gray-600 dark:text-gray-300">Ingresa tus credenciales para continuar</p>
        </div>

        <!-- Login Form -->
        <Form :validation-schema="loginSchema" @submit="onSubmit" class="space-y-6">
          <!-- Email Field -->
          <InputText
            name="email"
            type="email"
            label="Correo Electrónico"
            placeholder="tu@email.com"
            focus-ring-color="focus:ring-blue-500"
          />

          <!-- Password Field -->
          <InputText
            name="password"
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            focus-ring-color="focus:ring-blue-500"
          />

          <!-- Submit Button -->
          <Button type="submit" variant="primary">
            Iniciar Sesión
          </Button>
        </Form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-300">
            ¿No tienes una cuenta?
            <RouterLink to="/register" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
              Regístrate aquí
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
const loginSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, 'El correo electrónico es requerido')
      .email('Ingresa un correo electrónico válido'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
)

// Función para manejar el envío del formulario
const onSubmit = async (values: Record<string, string>) => {
  try {
    console.log('Datos del formulario:', values)
    // Aquí iría la lógica de autenticación
    // Por ahora solo simulamos un delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirigir al home después del login exitoso
    router.push('/')
  } catch (error) {
    console.error('Error en el login:', error)
  }
}
</script> 