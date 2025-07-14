import type { FetchInstance } from '@/modules/shared/GlobalFetch'
import { GetAllCustomers } from '@/modules/customers/application/useCases/GetAllCustomers'
import { ApiCustomersRepository } from '@/modules/customers/adapters/repositories/ApiCustomersRepository'

export interface CustomerProvider {
  getAllCustomersUseCase: GetAllCustomers;
}

export function customerProvider(fetchInstance: FetchInstance): CustomerProvider {
  const customersRepository = new ApiCustomersRepository(fetchInstance);
  const getAllCustomersUseCase = new GetAllCustomers(customersRepository);

  return {
    getAllCustomersUseCase,
  };
}
