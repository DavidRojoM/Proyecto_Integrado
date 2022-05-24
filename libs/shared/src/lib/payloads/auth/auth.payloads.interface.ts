import { UserDto } from '../../domain/dto/users/user.dto';
import { ErrorPayload } from '../errors/error.payload';

export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResponse = SuccessfulLoginResponse | ErrorPayload;

export class SuccessfulLoginResponse {
  access_token: string;
  user: Partial<UserDto>;
}

export interface Token {
  access_token: string;
}
