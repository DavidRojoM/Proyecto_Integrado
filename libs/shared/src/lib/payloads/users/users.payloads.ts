import { UserDto } from '../../domain/dto/users/user.dto';
import { ErrorPayload } from '../errors/error.payloads';
import { Result } from '../../domain/types/result.type';
import { User } from '../../domain/models/users/user.model';
import { UserPartyDto } from '../../domain/dto/users/user-party.dto';
import { UserParty } from '../../domain/models/users/user-party.model';

export interface FindUserByUsernamePayload {
  username: string;
}

export interface FindUserByIdPayload {
  id: string;
}

export type FindUserResponse = Result<UserDto, ErrorPayload>;
export type FindUser = Result<User, ErrorPayload>;

export type AddUserResponse = Result<UserDto, ErrorPayload>;
export type InsertUser = Result<User, ErrorPayload>;

export type FindUserPartyByIdResponse = Result<UserPartyDto, ErrorPayload>;
export type InsertUserPartyResponse = Result<UserPartyDto, ErrorPayload>;

export type FindUserPartyById = Result<UserParty, ErrorPayload>;
export type InsertUserParty = Result<UserParty, ErrorPayload>;
