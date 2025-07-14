import type { Component } from 'vue'
import IconPlus from './IconPlus.vue'
import IconSearch from './IconSearch.vue'
import IconPhone from './IconPhone.vue'
import IconCamera from './IconCamera.vue'
import IconDot from './IconDot.vue'
import IconEmoji from './IconEmoji.vue'
import IconClip from './IconClip.vue'
import IconSend from './IconSend.vue'
import IconSpinner from './IconSpinner.vue'
import IconSettings from './IconSettings.vue'
import IconLogout from './IconLogout.vue'

export const iconComponents: Record<string, Component> = {
  plus: IconPlus,
  search: IconSearch,
  phone: IconPhone,
  camera: IconCamera,
  dot: IconDot,
  emoji: IconEmoji,
  clip: IconClip,
  send: IconSend,
  spinner: IconSpinner,
  settings: IconSettings,
  logout: IconLogout,
}
