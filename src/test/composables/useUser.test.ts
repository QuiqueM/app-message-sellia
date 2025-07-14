import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUser } from '@/composables/useUser'
import { setActivePinia, createPinia } from 'pinia'
vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')
  return {
    ...actual,
    inject: () => mockUserProvider
  }
})

// Mock del UserProvider
const mockUserProvider = {
  registerUserUseCase: {
    execute: vi.fn(async (user) => ({ ...user, id: '1' }))
  },
  loginUserUseCase: {
    execute: vi.fn(async (credentials) => true)
  }
}

describe('useUser composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('registra usuario correctamente', async () => {
    const { registerUser } = useUser()
    const user = { name: 'Juan', email: 'juan@mail.com', password: '1234', confirmPassword: '1234' }
    const result = await registerUser(user)
    expect(result).toBe(true)
    expect(mockUserProvider.registerUserUseCase.execute).toHaveBeenCalledWith(user)
  })

  it('login usuario correctamente', async () => {
    const { loginUser } = useUser()
    const credentials = { email: 'juan@mail.com', password: '1234' }
    const result = await loginUser(credentials)
    expect(mockUserProvider.loginUserUseCase.execute).toHaveBeenCalledWith(credentials)
  })
})
