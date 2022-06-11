import { Injectable } from '@nestjs/common';
import {
  DestinationsRepository,
  FindAllTripsResponse,
  HotelsRepository,
  InsertTripResponse,
  TransportsRepository,
  Trip,
  TripDto,
  TripsRepository,
} from '@proyecto-integrado/shared';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class TripsService {
  constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly destinationRepository: DestinationsRepository,
    private readonly hotelsRepository: HotelsRepository,
    private readonly transportsRepository: TransportsRepository
  ) {}

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
    const tripModel = Trip.dtoToModel(trip);
    if (trip.destinationId) {
      tripModel.destination = await this.destinationRepository.findById(
        trip.destinationId
      );
    }

    if (trip.hotelId) {
      tripModel.hotel = await this.hotelsRepository.findById(trip.hotelId);
    }

    if (trip.transportId) {
      tripModel.transport = await this.transportsRepository.findById(
        trip.transportId
      );
    }

    const insertResult = await this.tripsRepository.createTrip(tripModel);

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
      value: insertResult.value,
    };
  }
}
