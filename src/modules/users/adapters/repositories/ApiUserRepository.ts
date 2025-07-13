import type { UserRepository } from "@/modules/users/domain/ports/UserRepository";
import type { FormUserLogin, FormUserRegister, User } from "@/modules/users/domain/RegisterUser";
import type { FetchInstance } from '@/modules/shared/GlobalFetch';
import { UserMapper } from "@/modules/users/adapters/mappers/UserMapper";
import { delay } from "@/modules/shared/Delay";

export class ApiUserRepository implements UserRepository {
  constructor(private readonly http: FetchInstance) { }

  async login(credentials: FormUserLogin): Promise<void> {
    //await this.http.get(`/users/login?email=${credentials.email}&password=${credentials.password}`);
    console.log('Simulating login with credentials:', credentials);
    await delay(1000)
  }

  async register(user: FormUserRegister): Promise<User> {
    // Simular llamada a la API para registrar un usuario
    try {
      // await this.http.post('/users/register', user)
      await delay(1000);
      return UserMapper.registerUserToUser(user);
    } catch (error) {
      console.error('Error registering user:', error)
      throw new Error('Registration failed')
    }
  }

  async logout(): Promise<void> {
    // Implement API call for user logout
  }
}
