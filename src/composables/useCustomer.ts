import { inject } from "vue";
import type { Customer } from "@/modules/customers/domain/Customer";
import type { CustomerProvider } from "@/dependencies/CustomerProvider";

export const useCustomer = () => {
  const customerProvider = inject<CustomerProvider>('customerProvider');

  if (!customerProvider) {
    throw new Error('CustomerProvider not found');
  }

  const getAllCustomers = async (): Promise<Customer[]> => {
    try {
      return await customerProvider.getAllCustomersUseCase.execute();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new Error('Failed to fetch customers');
    }
  };

  return {
    getAllCustomers,
  };
};
