import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DestinationDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
