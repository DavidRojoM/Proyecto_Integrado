import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserPartyStatus } from '../../enums/user-party-status.enum';

export class JoinPartyDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  partyId: string;

  @IsOptional()
  @IsEnum(UserPartyStatus)
  status?: UserPartyStatus;
}
