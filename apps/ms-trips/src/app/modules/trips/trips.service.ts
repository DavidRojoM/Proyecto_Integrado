import { Injectable } from '@nestjs/common';
import { TripsRepository } from './trips.repository';
import {
  FindAllTripsResponse,
  InsertTripResponse,
  Trip,
  TripDto,
} from '@proyecto-integrado/shared';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class TripsService {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async findAll(): Promise<FindAllTripsResponse> {
    try {
      const models = await this.tripsRepository.findAllTrips();
      return {
        ok: true,
        value: models.map((model) => Trip.modelToDto(model)),
      };
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.response.statusCode,
          statusText: e.response.statusText,
        },
      };
    }
  }

  async create(@Payload() trip: TripDto): Promise<InsertTripResponse> {
    try {
      const model = await this.tripsRepository.createTrip(
        Trip.dtoToModel(trip)
      );
      return {
        ok: true,
        value: Trip.modelToDto(model),
      };
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: e.response.statusCode,
          statusText: e.response.statusText,
        },
      };
    }
  }
}
