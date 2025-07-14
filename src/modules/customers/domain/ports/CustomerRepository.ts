import type { Customer } from "../Customer";

export interface CustomerRepository {
  getAll(): Promise<Customer[]>
}
