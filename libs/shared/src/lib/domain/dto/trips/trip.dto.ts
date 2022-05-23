import { DestinationDto } from './destination.dto';
import { HotelDto } from './hotel.dto';
import { TransportDto } from './transport.dto';

export class TripDto {
  id: string;
  from: Date;
  to: Date;
  destination: DestinationDto;
  hotel: HotelDto;
  transport: TransportDto;
}
