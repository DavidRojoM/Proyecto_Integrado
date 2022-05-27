import { Module } from '@nestjs/common';
import { EntitiesModule, ENVIRONMENT } from '@proyecto-integrado/shared';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './mail.controller';
import { ClientsModule } from '@nestjs/microservices';
import { RMQCONFIG } from '@proyecto-integrado/config';

@Module({
  imports: [
    EntitiesModule,
    ClientsModule.register(RMQCONFIG),
    MailerModule.forRoot({
      transport: {
        service: ENVIRONMENT.MAIL_SERVICE,
        secure: true,
        auth: {
          user: ENVIRONMENT.MAIL_USER,
          pass: ENVIRONMENT.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"Meet n' Trip" <${ENVIRONMENT.MAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class AppModule {}
