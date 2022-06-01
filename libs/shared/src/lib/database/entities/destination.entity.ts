import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TripEntity } from './trip.entity';
import { WishlistEntity } from './wishlist.entity';

@Entity('destinations')
export class DestinationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => TripEntity, (trip) => trip.destination, {
    nullable: true,
  })
  trip: TripEntity;

  @OneToMany((type) => WishlistEntity, (wishList) => wishList.destination)
  wishList: WishlistEntity[];

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description?: string;
}
