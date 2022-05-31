import { Controller } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  FindAllTransportsResponse,
  InsertTransportResponse,
  PayloadActions,
  TransportDto,
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
}
