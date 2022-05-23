import { Transports } from '../../enums/transports.enum';

export class TransportDto {
  id: number;
  name: string;
  type: Transports;
  price: number;
  brand: string;
}
