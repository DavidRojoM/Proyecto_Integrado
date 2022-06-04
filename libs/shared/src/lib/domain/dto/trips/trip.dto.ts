import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TripDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  from: Date;

  @IsNotEmpty()
  @IsString()
  to: Date;

  @IsOptional()
  @IsNumber()
  destinationId?: number;

  @IsOptional()
  @IsNumber()
  hotelId?: number;

  @IsNumber()
  @IsOptional()
  transportId?: number;
}
