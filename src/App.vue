<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

const { toggleDarkMode, isDark } = useDarkMode()

</script>

<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <RouterLink to="/" class="text-xl font-bold text-gray-900 dark:text-white">
            App Message Sellia
          </RouterLink>
        </div>
        
        <nav class="flex space-x-8 items-center">
          <RouterLink 
            to="/" 
            class="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 dark:text-blue-400"
          >
            Inicio
          </RouterLink>
          <RouterLink 
            to="/login" 
            class="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 dark:text-blue-400"
          >
            Iniciar Sesión
          </RouterLink>
          <RouterLink 
            to="/register" 
            class="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 dark:text-blue-400"
          >
            Registrarse
          </RouterLink>
          <button
            @click="toggleDarkMode"
            class="ml-4 px-3 py-2 rounded text-sm font-medium transition-colors bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            :title="isDark ? 'Modo claro' : 'Modo oscuro'"
          >
            {{ isDark ? '🌙' : '☀️' }}
          </button>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
