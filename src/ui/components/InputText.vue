<template>
  <div>
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <Field
      v-slot="{ field, errorMessage }"
      :name="name"
      :type="type"
    >
      <input
        v-bind="field"
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition duration-200"
        :class="[
          focusRingColor,
          { 'border-red-500': errorMessage }
        ]"
      />
    </Field>
    <ErrorMessage :name="name" class="text-red-500 text-sm mt-1 block" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

interface Props {
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  id?: string
  focusRingColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  placeholder: '',
  id: '',
  focusRingColor: 'focus:ring-blue-500'
})

// Generar ID automático si no se proporciona
const inputId = computed(() => props.id || props.name)

// Exportar el componente
defineOptions({
  name: 'InputText'
})
</script> 