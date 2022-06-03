import { MessageDto } from '../comms/message.dto';
import { Roles } from '../../enums/roles.enum';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserPartyDto } from './user-party.dto';

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

  @IsOptional()
  @IsString()
  role?: Roles;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsBoolean()
  banned?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;

  @IsString()
  @IsNotEmpty()
  bankAccount: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => UserPartyDto)
  parties?: UserPartyDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => MessageDto)
  messages?: MessageDto[];

  @IsOptional()
  status?: string;
}
