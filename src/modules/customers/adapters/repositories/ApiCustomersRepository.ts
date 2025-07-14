import type { Customer } from "@/modules/customers/domain/Customer";
import type { CustomerRepository } from "@/modules/customers/domain/ports/CustomerRepository";
import type { FetchInstance } from "@/modules/shared/GlobalFetch";
import { Success, Failure } from "@/modules/shared/EasyResult";
import { HttpError } from "@/modules/shared/HttpError";

export class ApiCustomersRepository implements CustomerRepository {
  constructor(private readonly http: FetchInstance) {}

  async getAll(): Promise<Success<Customer[]> | Failure<HttpError>> {
    try {
      const response = await this.http.get<Customer[]>('/clients.json')
      return Success.create(response);
    } catch (error) {
      console.error('Error fetching customers:', error);
      return Failure.create(new HttpError(500, 'error'));
    }
  }
}
