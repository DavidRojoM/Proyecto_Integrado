import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TripEntity } from './trip.entity';

@Entity('destinations')
export class DestinationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => TripEntity, (trip) => trip.destination, {
    nullable: true,
  })
  trip: TripEntity;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description?: string;
}
