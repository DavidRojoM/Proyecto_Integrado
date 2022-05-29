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
    if (trip.destination) {
      entity.destination = Destination.modelToEntity(trip.destination);
    }
    if (trip.transport) {
      entity.transport = Transport.modelToEntity(trip.transport);
    }
    if (trip.hotel) {
      entity.hotel = Hotel.modelToEntity(trip.hotel);
    }
    return entity;
  }

  static entityToModel(trip: TripEntity): Trip {
    const model = new Trip();
    model.id = trip.id;
    model.from = trip.from;
    model.to = trip.to;
    if (trip.destination) {
      model.destination = Destination.entityToModel(trip.destination);
    }
    if (trip.transport) {
      model.transport = Transport.entityToModel(trip.transport);
    }
    if (trip.hotel) {
      model.hotel = Hotel.entityToModel(trip.hotel);
    }
    return model;
  }

  static modelToDto(trip: Trip): TripDto {
    const dto = new TripDto();
    dto.id = trip.id;
    dto.from = trip.from;
    dto.to = trip.to;
    if (trip.destination) {
      dto.destination = Destination.modelToDto(trip.destination);
    }
    if (trip.transport) {
      dto.transport = Transport.modelToDto(trip.transport);
    }
    if (trip.hotel) {
      dto.hotel = Hotel.modelToDto(trip.hotel);
    }
    return dto;
  }

  static dtoToModel(trip: TripDto): Trip {
    const model = new Trip();
    model.id = trip.id;
    model.from = trip.from;
    model.to = trip.to;
    if (trip.destination) {
      model.destination = Destination.dtoToModel(trip.destination);
    }
    if (trip.transport) {
      model.transport = Transport.dtoToModel(trip.transport);
    }
    if (trip.hotel) {
      model.hotel = Hotel.dtoToModel(trip.hotel);
    }
    return model;
  }
}
