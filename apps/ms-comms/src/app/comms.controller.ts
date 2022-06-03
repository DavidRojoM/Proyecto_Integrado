import { Controller } from '@nestjs/common';

import { CommsService } from './comms.service';
import { MessagePattern } from '@nestjs/microservices';
import {
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
}
