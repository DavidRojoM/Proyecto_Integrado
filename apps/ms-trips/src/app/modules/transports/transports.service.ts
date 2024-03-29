import { Injectable } from '@nestjs/common';
import {
  DeleteTripAggregateResponse,
  FindAllTransportsResponse,
  InsertTransportResponse,
  Transport,
  TransportDto,
  TransportsRepository,
  UpdateTransportResponse,
} from '@proyecto-integrado/shared';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class TransportsService {
  constructor(private readonly transportsRepository: TransportsRepository) {}

  async findAll(): Promise<FindAllTransportsResponse> {
    try {
      const transports = await this.transportsRepository.findAllTransports();
      return {
        ok: true,
        value: transports.map((transport) => Transport.modelToDto(transport)),
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
    @Payload() transport: TransportDto
  ): Promise<InsertTransportResponse> {
    const insertResult = await this.transportsRepository.createTransport(
      Transport.dtoToModel(transport)
    );

    if (insertResult.ok === false) {
      return insertResult;
    }

    return {
      ok: true,
      value: Transport.modelToDto(insertResult.value),
    };
  }

  delete(id: number): Promise<DeleteTripAggregateResponse> {
    return this.transportsRepository.deleteTransportById(id);
  }

  async update(transport: TransportDto): Promise<UpdateTransportResponse> {
    const model = Transport.dtoToModel(transport);
    const res = await this.transportsRepository.updateTransport(model);
    if (res.ok === false) {
      return res;
    }
    return {
      ok: true,
      value: Transport.modelToDto(res.value),
    };
  }
}
