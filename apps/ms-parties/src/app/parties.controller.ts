import { Controller } from '@nestjs/common';

import { PartiesService } from './parties.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  InsertUserPartyResponse,
  JoinPartyDto,
  PayloadActions,
} from '@proyecto-integrado/shared';

@Controller()
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @MessagePattern(PayloadActions.PARTIES.JOIN)
  async joinParty(data: JoinPartyDto): Promise<InsertUserPartyResponse> {
    return this.partiesService.joinParty(data);
  }
}
