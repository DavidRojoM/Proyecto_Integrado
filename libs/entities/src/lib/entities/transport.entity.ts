import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transports } from '@proyecto-integrado/shared';
import { TripEntity } from './trip.entity';

@Entity()
export class TransportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    enum: Transports,
  })
  type: Transports;

  @Column({
    type: 'decimal',
  })
  price: number;

  @Column()
  brand: string;

  @OneToMany((type) => TripEntity, (trip) => trip.destination)
  trip: TripEntity;
}
