import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  FindAllTransportsResponse,
  InsertTransportResponse,
  PayloadActions,
  TransportDto,
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
}
