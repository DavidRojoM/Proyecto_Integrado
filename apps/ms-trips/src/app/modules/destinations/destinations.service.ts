import { Injectable } from '@nestjs/common';
import {
  FindAllDestinationsResponse,
  Destination,
  DestinationDto,
  InsertDestinationResponse,
  DestinationsRepository,
} from '@proyecto-integrado/shared';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class DestinationsService {
  constructor(
    private readonly destinationsRepository: DestinationsRepository
  ) {}

  async findAll(): Promise<FindAllDestinationsResponse> {
    try {
      const destinations =
        await this.destinationsRepository.findAllDestinations();
      return {
        ok: true,
        value: destinations.map((destination) =>
          Destination.modelToDto(destination)
        ),
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

  async create(
    @Payload() destination: DestinationDto
  ): Promise<InsertDestinationResponse> {
    const insertResult = await this.destinationsRepository.createDestination(
      Destination.dtoToModel(destination)
    );

    if (!insertResult.ok) {
      return insertResult;
    }

    return {
      ok: true,
      value: Destination.modelToDto(insertResult.value),
    };
  }
}
