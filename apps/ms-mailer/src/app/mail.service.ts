import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Party, User, UserDto } from '@proyecto-integrado/shared';

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
      .catch(console.error);
  }

  sendPartyConfirmation({ users, party }: { users: User[]; party: Party }) {
    for (const user of users) {
      const from = new Date(party.trip.from);
      const to = new Date(party.trip.to);
      this.mailerService
        .sendMail({
          to: user.email,
          subject: 'Your party has been confirmed!',
          context: {
            username: user.username,
            partyName: party.name,
            from: `${from.getDate()}/${from.getMonth()}/${from.getFullYear()}`,
            to: `${to.getDate()}/${to.getMonth()}/${to.getFullYear()}`,
            destination: party.trip.destination.name,
          },
          template: 'party-confirmation',
        })
        .catch(console.error);
    }
  }
}
