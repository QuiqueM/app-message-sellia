import { Success, Failure } from '@/modules/shared/EasyResult'
import { HttpError } from '@/modules/shared/HttpError'
import type { Customer } from '@/modules/customers/domain/Customer'
import type { CustomerRepository } from '@/modules/customers/domain/ports/CustomerRepository'

export class GetAllCustomers {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<Success<Customer[]> | Failure<HttpError>> {
    return this.customerRepository.getAll()
  }
}
