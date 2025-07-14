import { inject } from 'vue'
import type { Customer } from '@/modules/customers/domain/Customer'
import type { CustomerProvider } from '@/dependencies/CustomerProvider'
import { Success } from '@/modules/shared/EasyResult'

export const useCustomer = () => {
  const customerProvider = inject<CustomerProvider>('customerProvider')

  if (!customerProvider) {
    throw new Error('CustomerProvider not found')
  }

  const getAllCustomers = async (): Promise<Customer[]> => {
    const response = await customerProvider.getAllCustomersUseCase.execute()
    if (Success.check(response)) {
      return response.value!
    }

    return []
  }

  return {
    getAllCustomers,
  }
}
