import { Controller } from '@nestjs/common';

import { CommsService } from './comms.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  FindMessages,
  MessageDto,
  PayloadActions,
  SendMessageResponse,
} from '@proyecto-integrado/shared';

@Controller()
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @MessagePattern(PayloadActions.COMMS.SEND_MESSAGE)
  sendMessage(message: MessageDto): Promise<SendMessageResponse> {
    return this.commsService.insertMessage(message);
  }

  @MessagePattern(PayloadActions.COMMS.FIND_MESSAGE_BY_PARTY_ID)
  findMessageByPartyId(
    @Payload('partyId') partyId: string
  ): Promise<FindMessages> {
    return this.commsService.findMessageByPartyId(partyId);
  }
}
