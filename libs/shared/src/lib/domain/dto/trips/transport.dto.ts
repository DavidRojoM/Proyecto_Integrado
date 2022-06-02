import { Transports } from '../../enums/transports.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class TransportDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEnum(Transports)
  type: Transports;

  @IsNumber()
  price: number;

  @IsString()
  brand: string;
}
