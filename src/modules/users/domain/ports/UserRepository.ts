import type { FormUserLogin, FormUserRegister, User } from "../RegisterUser";

export interface UserRepository {
  login(credentials: FormUserLogin): Promise<void>
  register(user: FormUserRegister): Promise<User>
  logout(): Promise<void>
}
