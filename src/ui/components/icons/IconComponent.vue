<script lang="ts" setup>
import { iconComponents } from '@components/icons/index'

interface Props {
  iconName: string
}
defineProps<Props>()

</script>
<template>
  <div>
    <component :is="iconComponents[iconName]" class="w-5 h-5" />
  </div>
</template>
