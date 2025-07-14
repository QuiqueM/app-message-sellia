<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import IconLogo from '@components/icons/IconLogo.vue'
import AvatarUser from '@components/atoms/AvatarUser.vue'
import { useAuthStore } from '@/stores/auth'
import IconButton from '@components/atoms/IconButton.vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const goToSettings = () => {
  router.push('/settings')
}
</script>
<template>
  <header
    class="bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-800 max-h-16"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <IconLogo />
        </div>

        <nav class="flex space-x-6 items-center">
          <div v-if="!authStore.isAuthenticated">
            <RouterLink
              to="/login"
              class="text-gray-600 hover:ring-2 hover:ring-blue-500  dark:text-gray-200 hover:text-blue-500 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-blue-600 dark:text-blue-400"
            >
              {{ $t('navBar.login') }}
            </RouterLink>
            <RouterLink
              to="/register"
              class="text-gray-600 hover:ring-2 hover:ring-blue-500  dark:text-gray-200 hover:text-blue-500 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-blue-600 dark:text-blue-400"
            >
              {{ $t('navBar.register') }}
            </RouterLink>
          </div>
          <div v-else class="hidden md:flex items-center space-x-2">
            <avatar-user avatar="" :name="authStore.loggedUser!.name" :is-online="false" />
            <div class="grid items-center">
              <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ authStore.loggedUser?.name }}
              </h3>
              <span class="text-xs text-gray-500 dark:text-gray-400"> Rol </span>
            </div>
          </div>

          <div class="flex items-center space-x-2" v-if="authStore.isAuthenticated">
            <IconButton icon="settings" @click="goToSettings" />
            <IconButton icon="logout" @click="logout" />
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
