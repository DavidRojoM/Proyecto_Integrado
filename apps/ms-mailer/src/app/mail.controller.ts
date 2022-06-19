import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import {
  Party,
  PayloadActions,
  User,
  UserDto,
} from '@proyecto-integrado/shared';
import { EventPattern } from '@nestjs/microservices';

@Controller('mailer')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern(PayloadActions.MAIL.SEND_SIGNUP_WELCOME)
  sendSignupWelcome(user: UserDto) {
    this.mailService.sendSignupWelcome(user);
  }

  @EventPattern(PayloadActions.MAIL.SEND_PARTY_CONFIRMATION)
  sendPartyConfirmation(config: { users: User[]; party: Party }) {
    this.mailService.sendPartyConfirmation(config);
  }
}
