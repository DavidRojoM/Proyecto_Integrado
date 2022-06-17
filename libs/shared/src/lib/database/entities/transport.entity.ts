import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transports } from '@proyecto-integrado/shared';
import { TripEntity } from './trip.entity';

@Entity('transports')
export class TransportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Transports,
  })
  type: Transports;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column()
  brand: string;

  @OneToMany((type) => TripEntity, (trip) => trip.destination)
  trip: TripEntity;
}
