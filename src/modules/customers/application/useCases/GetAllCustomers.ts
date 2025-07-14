import type { Customer } from "@/modules/customers/domain/Customer";
import type { CustomerRepository } from "@/modules/customers/domain/ports/CustomerRepository";

export class GetAllCustomers {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<Customer[]> {
    return this.customerRepository.getAll();
  }
}
