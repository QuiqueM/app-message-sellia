<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4"
  >
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
          <Button type="submit" variant="primary"> Crear Cuenta </Button>
        </Form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-300">
            ¿Ya tienes una cuenta?
            <RouterLink
              to="/login"
              class="text-green-600 dark:text-green-400 hover:text-green-700 font-medium"
            >
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
import { useRouter } from 'vue-router'
import InputText from '@components/molecules/InputText.vue'
import Button from '@components/atoms/Button.vue'
import { FormUserRegisterSchema, type FormUserRegister } from '@/modules/users/domain/RegisterUser'
import { useUser } from '@/composables/useUser'

const router = useRouter()
const { registerUser } = useUser()

// Schema de validación con Zod
const registerSchema = toTypedSchema(FormUserRegisterSchema)

// Función para manejar el envío del formulario
const onSubmit = async (data: FormUserRegister) => {
  try {
    await registerUser(data)

    // Redirigir al login después del registro exitoso
    router.push('/login')
  } catch (error) {
    console.error('Error en el registro:', error)
  }
}
</script>
