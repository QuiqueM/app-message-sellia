<template>
  <div
    class="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('navBar.login') }}</h2>
          <p class="text-gray-600 dark:text-gray-300"> {{ $t('labels.loginDescription') }}</p>
        </div>

        <div v-if="showAlert" class="mb-4">
          <AlertMessage
            :message="$t('labels.credentialError')"
            type="error"
          />
        </div>

        <!-- Login Form -->
        <Form :validation-schema="loginSchema" @submit="onSubmit" class="space-y-6">
          <!-- Email Field -->
          <InputText
            name="email"
            type="email"
            :label="$t('labels.email')"
            placeholder="tu@email.com"
            focus-ring-color="focus:ring-blue-500"
          />

          <!-- Password Field -->
          <InputText
            name="password"
            type="password"
            :label="$t('labels.password')"
            placeholder="••••••••"
            focus-ring-color="focus:ring-blue-500"
          />

          <!-- Submit Button -->
          <Button type="submit" variant="primary" :disabled="loading">
           <span v-if="!loading"> {{ $t('navBar.login') }} </span>
           <span v-else class="flex justify-center"><icon icon-name="spinner" /> </span>
          </Button>
        </Form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('labels.notAccount') }}
            <RouterLink
              to="/register"
              class="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
            >
              {{ $t('labels.registerHere') }}
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import InputText from '@components/molecules/InputText.vue'
import Button from '@components/atoms/Button.vue'
import { FormUserLoginSchema, type FormUserLogin } from '@/modules/users/domain/RegisterUser'
import { useUser } from '@/composables/useUser'
import AlertMessage from '@components/atoms/AlertMessage.vue'
import Icon from '@components/icons/IconComponent.vue'

const router = useRouter()
const { loginUser } = useUser()
const showAlert = ref(false)
const loading = ref(false)

// Schema de validación con Zod
const loginSchema = toTypedSchema(FormUserLoginSchema)

// Función para manejar el envío del formulario
const onSubmit = async (values: FormUserLogin) => {
  try {
    loading.value = true
    const isLogged = await loginUser(values)
    loading.value = false
    if (isLogged) {
      router.push('/chat')
    } else {
      showAlert.value = true
    }
  } catch (error) {
    console.error('Error en el login:', error)
  }
}
</script>
