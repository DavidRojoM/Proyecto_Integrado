import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TripEntity } from './trip.entity';

@Entity()
export class HotelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({
    type: 'decimal',
  })
  nightPrice: number;

  @Column()
  image: string;

  @OneToMany((type) => TripEntity, (trip) => trip.destination)
  trip: TripEntity;
}
