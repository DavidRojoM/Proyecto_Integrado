import { UserDto } from '../../domain/dto/users/user.dto';
import { ErrorPayload } from '../errors/error.payload';
import { Result } from '../../domain/types/result.type';

export interface FindOneByUsername {
  username: string;
}

export type FindOneByUsernameResponse = Result<UserDto, ErrorPayload>;
