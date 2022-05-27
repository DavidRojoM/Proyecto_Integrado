import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User, UserDto } from '@proyecto-integrado/shared';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendSignupWelcome(user: UserDto) {
    const userModel = User.dtoToModel(user);
    await this.mailerService
      .sendMail({
        to: userModel.email,
        subject: 'Thank you for joining us!',
        context: {
          name: userModel.username,
        },
        template: 'signup-welcome',
      })
      .catch(console.log);
  }
}
