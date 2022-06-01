import { Injectable } from '@nestjs/common';
import {
  FindAllTripsResponse,
  InsertTripResponse,
  Trip,
  TripDto,
  TripsRepository,
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
    const insertResult = await this.tripsRepository.createTrip(
      Trip.dtoToModel(trip)
    );

    if (!insertResult.ok) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Trip already exists',
        },
      };
    }

    return {
      ok: true,
      value: Trip.modelToDto(insertResult.value),
    };
  }
}
