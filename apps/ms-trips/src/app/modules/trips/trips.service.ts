import { Injectable } from '@nestjs/common';
import {
  DestinationsRepository,
  FindAllTripsResponse,
  FindTripResponse,
  HotelsRepository,
  InsertTripResponse,
  TransportsRepository,
  Trip,
  TripDto,
  TripsRepository,
} from '@proyecto-integrado/shared';

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

  async create(trip: TripDto): Promise<InsertTripResponse> {
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

    return this.tripsRepository.createTrip(tripModel);
  }

  findById(id: string): Promise<FindTripResponse> {
    return this.tripsRepository.findById(id);
  }
}
