import { config } from 'dotenv';
config();

export const ENVIRONMENT = {
  RMQ_URL: 'amqp://localhost:5672',
  GATEWAY_PORT: Number(process.env.GATEWAY_PORT || 3000),
  IMAGES_PORT: Number(process.env.IMAGES_PORT || 3001),

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
  JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION || '5m',

  MYSQL_INNER_PORT: Number(process.env.MYSQL_INNER_PORT || 3306),
  MYSQL_OUTER_PORT: Number(process.env.MYSQL_OUTER_PORT || 3306),
  MYSQL_USER: process.env.MYSQL_USER || 'david',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'david',
  MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD || 'root',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'proyectointegrado',
  //TODO: CHANGE TO DOCKER CONTAINER NAME WHEN DOCKERIZED
  MYSQL_HOST: 'localhost',

  MAIL_SERVICE: process.env.MAIL_SERVICE || 'gmail',
  MAIL_USER: process.env.MAIL_USER || 'example@gmail.com',
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || 'password',
  MAIL_FROM: process.env.MAIL_FROM || 'example@gmail.com',
};

export const QUEUES = {
  GATEWAY: 'GATEWAY_QUEUE',
  AUTH: 'AUTH_QUEUE',
  USERS: 'USERS_QUEUE',
  IMAGES: 'IMAGES_QUEUE',
  MAILER: 'MAILER_QUEUE',
  COMMS: 'COMMS_QUEUE',
  TRIPS: 'TRIPS_QUEUE',
  PARTIES: 'PARTIES_QUEUE',
};
