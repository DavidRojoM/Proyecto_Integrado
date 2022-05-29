import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { ENVIRONMENT, QUEUES } from '@proyecto-integrado/shared';

export const RMQCONFIG: ClientsModuleOptions = [
  {
    name: 'AUTH_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.AUTH,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
  {
    name: 'GATEWAY_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.GATEWAY,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
  {
    name: 'USERS_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.USERS,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
  {
    name: 'MAILER_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.MAILER,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
  {
    name: 'IMAGES_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.IMAGES,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
];
