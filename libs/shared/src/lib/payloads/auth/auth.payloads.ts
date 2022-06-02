import { UserDto } from '../../domain/dto/users/user.dto';
import { ErrorPayload } from '../errors/error.payloads';
import { IsNotEmpty, IsString } from 'class-validator';
import { Result } from '../../domain/types/result.type';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export type LoginResponse = Result<SuccessfulLoginResponse, ErrorPayload>;

export type ValidateUser = Result<UserDto, ErrorPayload>;

export interface SuccessfulLoginResponse {
  access_token: string;
  user: Partial<UserDto>;
}

export interface Token {
  access_token: string;
}
