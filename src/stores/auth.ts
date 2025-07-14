import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { FormUserLogin, User } from '@/modules/users/domain/RegisterUser'

export const useAuthStore = defineStore('auth', () => {
  const registeredUsers = ref<User[]>([]) // Array to hold registered users
  const loggedUser = ref<User | null>(null) // Currently logged-in user

  const isAuthenticated = computed(() => loggedUser.value !== null)

  const addUser = (user: User) => {
    registeredUsers.value.push(user)
  }

  const login = (credentials: FormUserLogin) => {
    const user = registeredUsers.value.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    )
    if (user) {
      loggedUser.value = user
      return true
    }
    return false
  }

  const logout = () => {
    loggedUser.value = null
  }

  return { registeredUsers, isAuthenticated, addUser, login, loggedUser, logout }
})
