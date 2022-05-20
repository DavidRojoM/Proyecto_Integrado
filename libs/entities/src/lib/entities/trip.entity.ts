import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { DestinationEntity } from './destination.entity';
import { TransportEntity } from './transport.entity';
import { HotelEntity } from './hotel.entity';

@Entity()
export class TripEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  from: Date;

  @Column()
  to: Date;

  @ManyToOne((type) => DestinationEntity, (destination) => destination.trip)
  destination: DestinationEntity;

  @ManyToOne((type) => TransportEntity, (transport) => transport.trip)
  transport: TransportEntity;

  @ManyToOne((type) => HotelEntity, (hotel) => hotel.trip)
  hotel: HotelEntity;
}
