import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { PayloadActions, UserDto } from '@proyecto-integrado/shared';
import { EventPattern } from '@nestjs/microservices';

@Controller('mailer')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern(PayloadActions.MAIL.SEND_SIGNUP_WELCOME)
  sendSignupWelcome(user: UserDto) {
    this.mailService.sendSignupWelcome(user);
  }
}
