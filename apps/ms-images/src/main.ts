import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ENVIRONMENT, QUEUES } from '@proyecto-integrado/shared';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [ENVIRONMENT.RMQ_URL],
        queue: QUEUES.IMAGES,
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  app.listen().then(() => {
    Logger.log(
      `🚀 Microservice running on: ${ENVIRONMENT.RMQ_URL} AT ${QUEUES.AUTH}`
    );
  });
}

bootstrap();
