import { UserDto } from '../../domain/dto/users/user.dto';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: Partial<UserDto>;
}

export interface Token {
  access_token: string;
}
