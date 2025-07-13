import type { FormUserRegister, User } from "@/modules/users/domain/RegisterUser";
import type { UserRepository } from "@/modules/users/domain/ports/UserRepository";

export class RegisterUser {
  constructor(private readonly registerUserRepository: UserRepository) {}

  async execute(user: FormUserRegister): Promise<User> {
    return await this.registerUserRepository.register(user)
  }
}
