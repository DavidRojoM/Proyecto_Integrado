import { TripDto } from '../../dto/trips/trip.dto';
import { Destination } from './destination.model';
import { Transport } from './transport.model';
import { Hotel } from './hotel.model';
import { TripEntity } from '../../../database/entities/trip.entity';

export class Trip {
  id: string;
  from: Date;
  to: Date;
  destination: Destination;
  transport: Transport;
  hotel: Hotel;

  static modelToEntity(trip: Trip): TripEntity {
    const entity = new TripEntity();
    entity.id = trip.id;
    entity.from = trip.from;
    entity.to = trip.to;
    entity.destination = Destination.modelToEntity(trip.destination);
    entity.transport = Transport.modelToEntity(trip.transport);
    entity.hotel = Hotel.modelToEntity(trip.hotel);
    return entity;
  }

  static entityToModel(trip: TripEntity): Trip {
    const model = new Trip();
    model.id = trip.id;
    model.from = trip.from;
    model.to = trip.to;
    model.destination = Destination.entityToModel(trip.destination);
    model.transport = Transport.entityToModel(trip.transport);
    model.hotel = Hotel.entityToModel(trip.hotel);
    return model;
  }

  static modelToDto(trip: Trip): TripDto {
    const dto = new TripDto();
    dto.id = trip.id;
    dto.from = trip.from;
    dto.to = trip.to;
    dto.destination = Destination.modelToDto(trip.destination);
    dto.transport = Transport.modelToDto(trip.transport);
    dto.hotel = Hotel.modelToDto(trip.hotel);
    return dto;
  }
}
