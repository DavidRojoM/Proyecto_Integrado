import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './ormConfig';
import { entities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class EntitiesModule {}
