import type { Customer } from "@/modules/customers/domain/Customer";
import type { CustomerRepository } from "@/modules/customers/domain/ports/CustomerRepository";
import type { FetchInstance } from "@/modules/shared/GlobalFetch";

export class ApiCustomersRepository implements CustomerRepository {
  constructor(private readonly http: FetchInstance) {}

  async getAll(): Promise<Customer[]> {
    try {
      const response = await this.http.get<Customer[]>('/clients.json')
      console.log('Customers fetched successfully:', response)
      return response
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new Error('Failed to fetch customers');
    }
  }
}
