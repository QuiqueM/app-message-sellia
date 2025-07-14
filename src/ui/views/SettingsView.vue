<script setup lang="ts">
import { ref } from 'vue'
import IconSettings from '@components/icons/IconSettings.vue'
import Avatar from '@components/atoms/AvatarUser.vue'
import FontZiseSwither from '../components/molecules/FontZiseSwither.vue'
import IconButton from '@components/atoms/IconButton.vue'
import { Locales } from '@/locales/locale'
import { useI18n } from 'vue-i18n'
import { useDarkMode } from '@/composables/useDarkMode'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { toggleDarkMode, isDark } = useDarkMode()
const { loggedUser } = storeToRefs(useAuthStore())
const route = useRouter()

const { locale, t } = useI18n()

const lenguages = ref([
  { label: t('settings.english'), value: Locales.EN },
  { label: t('settings.spanish'), value: Locales.ES },
])

const setLocale = (lang: Locales) => {
  localStorage.setItem('lang', lang)
  locale.value = lang
}

const closeSettings = () => {
  route.back()
}
</script>
<template>
  <div
    class="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="max-w-2xl mx-auto py-8 px-4">
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold mb-8 flex items-center gap-2 dark:text-white">
          <IconSettings class="w-7 h-7" />
          {{ $t('settings.title') }}
        </h1>
        <div>
          <IconButton icon="close" @click="closeSettings" />
        </div>
      </div>
      <!-- Sección de Perfil -->
      <section class="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">{{ $t('settings.profile') }}</h2>
        <hr class="text-gray-200 my-2" />
        <div class="flex flex-col items-center gap-3">
          <Avatar :name="loggedUser!.name" avatar="" :is-online="false" />
          <label class="font-medium dark:text-white">{{ loggedUser!.name }}</label>
        </div>
      </section>

      <!-- Sección de Preferencias -->
      <section class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">{{ $t('settings.preference') }}</h2>
        <hr class="text-gray-200 my-2" />
        <div class="flex flex-col gap-2">
          <div class="flex gap-4 items-center">
            <label class="font-medium dark:text-white">{{ $t('settings.lang') }}</label>
            <div class="flex gap-2 p-1 bg-gray-200 dark:bg-gray-700 h-10 rounded-lg justify-center items-center">
              <button
                v-for="(lenguage, index) in lenguages"
                :key="index"
                class="rounded-md h-auto px-2 py-1 hover:bg-white hover:dark:bg-gray-400 dark:text-white cursor-pointer"
                :class="{ 'bg-white dark:bg-gray-400': locale === lenguage.value }"
                @click="setLocale(lenguage.value)"
              >
                {{ lenguage.label }}
              </button>
            </div>
          </div>
          <hr class="text-gray-200 my-2" />
          <div class="flex gap-4 items-center">
            <label class="font-medium dark:text-white">{{ $t('settings.theme') }}</label>
            <button
              @click="toggleDarkMode"
              class="ml-4 px-3 py-2 rounded text-sm font-medium transition-colors bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
            >
              {{ isDark ? '🌙' : '☀️' }}
            </button>
          </div>
          <hr class="text-gray-200 my-2" />
          <FontZiseSwither />
        </div>
      </section>
    </div>
  </div>
</template>
