import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TripEntity } from './trip.entity';

@Entity()
export class DestinationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => TripEntity, (trip) => trip.destination)
  trip: TripEntity;

  @Column()
  name: string;

  @Column({
    nullable: false,
  })
  description: string;
}
