import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  DeleteTripAggregateResponse,
  FindAllTransportsResponse,
  InsertTransportResponse,
  PayloadActions,
  TransportDto,
  UpdateTransportResponse,
} from '@proyecto-integrado/shared';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransportsService {
  constructor(
    @Inject('TRIPS_SERVICE') private readonly tripsProxy: ClientProxy
  ) {}

  async getTransports(): Promise<TransportDto[]> {
    const result = await firstValueFrom(
      this.tripsProxy.send<FindAllTransportsResponse>(
        PayloadActions.TRIPS.TRANSPORTS.FIND_ALL,
        {}
      )
    );

    if (result.ok === false) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  async createTransport(transport: TransportDto): Promise<TransportDto> {
    const response = await firstValueFrom(
      this.tripsProxy.send<InsertTransportResponse, TransportDto>(
        PayloadActions.TRIPS.TRANSPORTS.CREATE,
        transport
      )
    );

    if (response.ok === false) {
      throw new BadRequestException(response.error);
    }

    return response.value;
  }

  async deleteTransport(id: number) {
    const response = await firstValueFrom(
      this.tripsProxy.send<
        DeleteTripAggregateResponse,
        { transportId: number }
      >(PayloadActions.TRIPS.TRANSPORTS.DELETE, { transportId: id })
    );
    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }

    return {
      transportId: response.value.id,
    };
  }

  async updateTransport(transport: TransportDto): Promise<TransportDto> {
    const response = await firstValueFrom(
      this.tripsProxy.send<UpdateTransportResponse, TransportDto>(
        PayloadActions.TRIPS.TRANSPORTS.UPDATE,
        transport
      )
    );
    if (response.ok === false) {
      throw new BadRequestException({
        statusText: response.error.statusText,
        statusCode: response.error.statusCode,
      });
    }
    return response.value;
  }
}
