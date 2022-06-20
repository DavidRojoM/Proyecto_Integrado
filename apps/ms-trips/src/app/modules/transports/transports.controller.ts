import { Controller } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  DeleteTripAggregateResponse,
  FindAllTransportsResponse,
  InsertTransportResponse,
  PayloadActions,
  TransportDto,
  UpdateTransportResponse,
} from '@proyecto-integrado/shared';

@Controller()
export class TransportsController {
  constructor(private readonly transportsService: TransportsService) {}

  @MessagePattern(PayloadActions.TRIPS.TRANSPORTS.FIND_ALL)
  findAll(): Promise<FindAllTransportsResponse> {
    return this.transportsService.findAll();
  }

  @MessagePattern(PayloadActions.TRIPS.TRANSPORTS.CREATE)
  create(transport: TransportDto): Promise<InsertTransportResponse> {
    return this.transportsService.create(transport);
  }

  @MessagePattern(PayloadActions.TRIPS.TRANSPORTS.UPDATE)
  update(@Payload() transport: TransportDto): Promise<UpdateTransportResponse> {
    return this.transportsService.update(transport);
  }

  @MessagePattern(PayloadActions.TRIPS.TRANSPORTS.DELETE)
  delete(
    @Payload('transportId') id: number
  ): Promise<DeleteTripAggregateResponse> {
    return this.transportsService.delete(id);
  }
}
