import { inject } from "vue"
import type { UserProvider } from "@/dependencies/UserProvider"
import type { FormUserRegister, FormUserLogin } from "@/modules/users/domain/RegisterUser"
import { useAuthStore } from "@/stores/auth"

export const useUser = () => {
  const userProvider = inject<UserProvider>('userProvider')
  const authStore = useAuthStore()

  const registerUser = async (user: FormUserRegister) => {
    if (!userProvider) {
      throw new Error('UserProvider not found')
    }
    try {
      const registeredUser = await userProvider.registerUserUseCase.execute(user)
      authStore.addUser(registeredUser)
      return true
    } catch (error) {
      console.error('Error registering user:', error)
      return false
    }
  }

  const loginUser = async (credentials: FormUserLogin): Promise<boolean> => {
    if (!userProvider) {
      throw new Error('UserProvider not found')
    }
    try {
      await userProvider.loginUserUseCase.execute(credentials)
      return authStore.login(credentials)
    } catch (error) {
      console.error('Error logging in user:', error)
      return false
    }
  }

  const logoutUser = () => {
    authStore.logout()
  }

  return {
    registerUser,
    loginUser,
    logoutUser,
  }
}
