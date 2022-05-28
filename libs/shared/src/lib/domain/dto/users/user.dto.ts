import { PartyDto } from '../parties/party.dto';
import { MessageDto } from '../comms/message.dto';
import { Roles } from '../../enums/roles.enum';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserPartiesDto } from './user-parties.dto';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  role?: Roles;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  banned?: boolean;

  @IsString()
  image?: string;

  @IsString()
  @IsNotEmpty()
  bankAccount: string;

  @IsString()
  nationality?: string;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => UserPartiesDto)
  parties: UserPartiesDto[];

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => MessageDto)
  messages: MessageDto[];
}
