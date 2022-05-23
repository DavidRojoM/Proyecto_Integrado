import { HotelDto } from '../../dto/trips/hotel.dto';
import { HotelEntity } from '../../../database/entities/hotel.entity';

export class Hotel {
  id: number;
  name: string;
  address: string;
  phone: string;
  nightPrice: number;
  image: string;

  static modelToEntity(hotel: Hotel): HotelEntity {
    const entity = new HotelEntity();
    entity.id = hotel.id;
    entity.name = hotel.name;
    entity.address = hotel.address;
    entity.phone = hotel.phone;
    entity.nightPrice = hotel.nightPrice;
    entity.image = hotel.image;
    return entity;
  }

  static entityToModel(hotel: HotelEntity): Hotel {
    const model = new Hotel();
    model.id = hotel.id;
    model.name = hotel.name;
    model.address = hotel.address;
    model.phone = hotel.phone;
    model.nightPrice = hotel.nightPrice;
    model.image = hotel.image;
    return model;
  }

  static modelToDto(hotel: Hotel): HotelDto {
    const dto = new HotelDto();
    dto.id = hotel.id;
    dto.name = hotel.name;
    dto.address = hotel.address;
    dto.phone = hotel.phone;
    dto.nightPrice = hotel.nightPrice;
    dto.image = hotel.image;
    return dto;
  }
}
