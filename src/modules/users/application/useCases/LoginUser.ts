import type { FormUserLogin } from "@/modules/users/domain/RegisterUser";
import type { UserRepository } from "@/modules/users/domain/ports/UserRepository";

export class LoginUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(credentials: FormUserLogin): Promise<void> {
    await this.userRepository.login(credentials);
  }
}
