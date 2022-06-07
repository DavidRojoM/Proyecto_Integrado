import { User } from '../../users/domain/interfaces/user.interface';

export interface LoginResponse {
  access_token: string;
  user: Partial<User>;
}
