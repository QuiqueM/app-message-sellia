import { Success, Failure } from '@/modules/shared/EasyResult'
import { HttpError } from '@/modules/shared/HttpError'
import type { Customer } from '../Customer'

export interface CustomerRepository {
  getAll(): Promise<Success<Customer[]> | Failure<HttpError>>
}
