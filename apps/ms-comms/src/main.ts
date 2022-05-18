/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ENVIRONMENT, QUEUES } from '@proyecto-integrado/shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [ENVIRONMENT.RMQ_URL],
        queue: QUEUES.COMMS,
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  app.listen().then(() => {
    Logger.log(
      `**COMMS** Microservice running on: ${ENVIRONMENT.RMQ_URL} AT ${QUEUES.COMMS}`
    );
  });
}

bootstrap();
