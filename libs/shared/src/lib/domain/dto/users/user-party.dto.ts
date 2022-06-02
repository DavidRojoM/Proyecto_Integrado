import { PartyDto, UserDto } from '@proyecto-integrado/shared';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { UserPartyStatus } from '../../enums/user-party-status.enum';

export class UserPartyDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserPartyDto)
  user: UserDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PartyDto)
  party: PartyDto;

  @IsOptional()
  @IsEnum(UserPartyStatus)
  status?: UserPartyStatus;
}
