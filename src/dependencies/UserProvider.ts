import type { FetchInstance } from '@/modules/shared/GlobalFetch';
import { ApiUserRepository } from '@/modules/users/adapters/repositories/ApiUserRepository'
import { RegisterUser } from '@/modules/users/application/useCases/RegisterUser';
import { LoginUser } from '@/modules/users/application/useCases/LoginUser';

export interface UserProvider {
  registerUserUseCase: RegisterUser;
  loginUserUseCase: LoginUser;
}

export function userProvier(fetchInstance: FetchInstance) : UserProvider {
  const userRepository = new ApiUserRepository(fetchInstance);
  const registerUserUseCase = new RegisterUser(userRepository);
  const loginUserUseCase = new LoginUser(userRepository);

  return {
    registerUserUseCase,
    loginUserUseCase,
  };

}
