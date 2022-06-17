import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TripEntity } from './trip.entity';

@Entity('hotels')
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
    precision: 10,
    scale: 2,
  })
  nightPrice: number;

  @Column()
  image: string;

  @OneToMany((type) => TripEntity, (trip) => trip.destination)
  trip: TripEntity;
}
