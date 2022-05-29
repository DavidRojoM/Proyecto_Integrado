import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { entities } from './entities';
import { ENVIRONMENT } from '../environment';

export const ormconfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: ENVIRONMENT.MYSQL_HOST,
  port: ENVIRONMENT.MYSQL_INNER_PORT,
  username: ENVIRONMENT.MYSQL_USER,
  password: ENVIRONMENT.MYSQL_PASSWORD,
  database: ENVIRONMENT.MYSQL_DATABASE,
  entities: [...entities],
  synchronize: true,
  logging: true,
  // migrations: ['dist/migrations/*.js'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
};
