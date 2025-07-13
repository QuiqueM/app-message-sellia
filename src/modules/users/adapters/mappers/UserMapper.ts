import type { FormUserRegister, User } from '@/modules/users/domain/RegisterUser'

export class UserMapper {
  static registerUserToUser(user: FormUserRegister): User {
    return {
      id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      password: user.password, // Note: Se guarda el password para simular el login
    }
  }
}
