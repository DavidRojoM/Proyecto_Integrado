import { IsNotEmpty, IsString } from 'class-validator';

export class JoinPartyDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  partyId: string;
}
