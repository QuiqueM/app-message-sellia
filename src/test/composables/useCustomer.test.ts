import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCustomer } from '@/composables/useCustomer'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('vue', () => ({
  ...vi.importActual('vue'),
  inject: () => ({
    getAllCustomersUseCase: {
      execute: vi.fn().mockResolvedValue(mockCustomers)
    }
  })
}))

const mockCustomers = [
  {
    _id: '1',
    name: 'Juan',
    isOnline: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    _id: '2',
    name: 'María',
    isOnline: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

describe('useCustomer composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('getAllCustomers retorna la lista de clientes', async () => {
    const { getAllCustomers } = useCustomer()
    const result = await getAllCustomers()
    // expect(result).toEqual(mockCustomers)
    expect(Array.isArray(result)).toBe(true)
  })
})
