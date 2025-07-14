<template>
  <div class="flex items-center gap-2">
    <label for="font-size" class="text-sm font-medium">Tamaño de fuente:</label>
    <select
      id="font-size"
      v-model="fontSize"
      @change="cambiarTamanio"
      class="border rounded px-2 py-1 text-sm"
    >
      <option value="text-sm">Pequeño</option>
      <option value="text-base">Normal</option>
      <option value="text-lg">Grande</option>
      <option value="text-xl">Muy grande</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const fontSize = ref('text-base')

// Inicializa desde localStorage
onMounted(() => {
  const saved = localStorage.getItem('fontSize')
  fontSize.value = saved || 'text-base'
  aplicarClaseFontSize(fontSize.value)
})

function cambiarTamanio() {
  localStorage.setItem('fontSize', fontSize.value)
  aplicarClaseFontSize(fontSize.value)
}

function aplicarClaseFontSize(clase: string) {
  const clases = ['text-sm', 'text-base', 'text-lg', 'text-xl']
  const root = document.documentElement
  root.classList.remove(...clases)
  root.classList.add(clase)
}
</script>
