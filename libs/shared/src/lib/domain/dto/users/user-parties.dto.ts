import { PartyDto, UserDto } from '@proyecto-integrado/shared';
import { UserPartyStatus } from '../../enums/user-party-status.enum';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class UserPartiesDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserPartiesDto)
  user: UserDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PartyDto)
  party: PartyDto;

  @IsOptional()
  @IsEnum(UserPartyStatus)
  status?: UserPartyStatus;
}
