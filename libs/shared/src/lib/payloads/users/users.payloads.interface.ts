import { UserDto } from '../../domain/dto/users/user.dto';
import { ErrorPayload } from '../errors/error.payload';
import { Result } from '../../domain/types/result.type';
import { User } from '../../domain/models/users/user.model';

export interface FindOneByUsername {
  username: string;
}

export type FindUserByUsernameResponse = Result<UserDto, ErrorPayload>;
export type FindUserByUsername = Result<User, ErrorPayload>;

export type AddUserResponse = Result<UserDto, ErrorPayload>;
export type InsertUser = Result<User, ErrorPayload>;
