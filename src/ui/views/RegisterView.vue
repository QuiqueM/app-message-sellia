<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import InputText from '@components/molecules/InputText.vue'
import Button from '@components/atoms/Button.vue'
import { FormUserRegisterSchema, type FormUserRegister } from '@/modules/users/domain/RegisterUser'
import { useUser } from '@/composables/useUser'
import Icon from '@components/icons/IconComponent.vue'

const router = useRouter()
const { registerUser } = useUser()

const loading = ref(false)

// Schema de validación con Zod
const registerSchema = toTypedSchema(FormUserRegisterSchema)

// Función para manejar el envío del formulario
const onSubmit = async (data: FormUserRegister) => {
  try {
    loading.value = true
    await registerUser(data)
    loading.value = false
    // Redirigir al login después del registro exitoso
    router.push('/login')
  } catch (error) {
    console.error('Error en el registro:', error)
  }
}
</script>
<template>
  <div
    class="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('labels.createAccount') }}</h2>
          <p class="text-gray-600 dark:text-gray-300">{{ $t('labels.registerDescription') }}</p>
        </div>

        <!-- Register Form -->
        <Form :validation-schema="registerSchema" @submit="onSubmit" class="space-y-6">
          <!-- Name Field -->
          <InputText
            name="name"
            type="text"
            :label="$t('labels.name')"
            placeholder="Tu nombre completo"
            focus-ring-color="focus:ring-green-500"
          />

          <!-- Email Field -->
          <InputText
            name="email"
            type="email"
            :label="$t('labels.email')"
            placeholder="tu@email.com"
            focus-ring-color="focus:ring-green-500"
          />

          <!-- Password Field -->
          <InputText
            name="password"
            type="password"
            :label="$t('labels.password')"
            placeholder="••••••••"
            focus-ring-color="focus:ring-green-500"
          />

          <!-- Confirm Password Field -->
          <InputText
            name="confirmPassword"
            type="password"
            :label="$t('labels.confirmPassword')"
            placeholder="••••••••"
            focus-ring-color="focus:ring-green-500"
          />

          <!-- Submit Button -->
          <Button type="submit" variant="primary" :disabled="loading">
            <span v-if="!loading"> {{ $t('labels.createAccount') }} </span>
            <span v-else class="flex justify-center"><icon icon-name="spinner" /> </span>
          </Button>
        </Form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('labels.haveAccount') }}
            <RouterLink
              to="/login"
              class="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
            >
              {{ $t('labels.loginHere') }}
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
