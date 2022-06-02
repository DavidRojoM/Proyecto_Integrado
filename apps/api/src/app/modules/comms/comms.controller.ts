import { Controller, Post } from '@nestjs/common';
import { CommsService } from './comms.service';
import { MessageDto } from '@proyecto-integrado/shared';

//TODO: MAKE THIS A GQL RESOLVER
@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Post()
  sendMessage(message: MessageDto) {
    this.commsService.sendMessage(message);
  }
}
