import { Controller } from '@nestjs/common';

import { CommsService } from './comms.service';
import { EventPattern } from '@nestjs/microservices';
import { MessageDto, PayloadActions } from '@proyecto-integrado/shared';

@Controller()
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @EventPattern(PayloadActions.COMMS.SEND_MESSAGE)
  sendMessage(message: MessageDto): void {
    this.commsService.insertMessage(message);
  }
}
