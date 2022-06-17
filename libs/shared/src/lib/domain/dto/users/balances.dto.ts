import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ChangeBalancesDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
