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
  {
    name: 'TRIPS_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.TRIPS,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
  {
    name: 'PARTIES_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.PARTIES,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
  {
    name: 'COMMS_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.COMMS,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
  {
    name: 'WISHLISTS_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.WISHLISTS,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
];
