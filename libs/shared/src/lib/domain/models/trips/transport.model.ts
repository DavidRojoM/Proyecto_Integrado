import { TransportDto } from '../../dto/trips/transport.dto';
import { Transports } from '../../enums/transports.enum';
import { TransportEntity } from '../../../database/entities/transport.entity';

export class Transport {
  id: number;
  name: string;
  type: Transports;
  price: number;
  brand: string;

  static modelToEntity(transport: Transport): TransportEntity {
    const entity = new TransportEntity();
    entity.id = transport.id;
    entity.name = transport.name;
    entity.type = transport.type;
    entity.price = transport.price;
    entity.brand = transport.brand;
    return entity;
  }

  static entityToModel(transport: TransportEntity): Transport {
    const model = new Transport();
    model.id = transport.id;
    model.name = transport.name;
    model.type = transport.type;
    model.price = transport.price;
    model.brand = transport.brand;
    return model;
  }

  static modelToDto(transport: Transport): TransportDto {
    const dto = new TransportDto();
    dto.id = transport.id;
    dto.name = transport.name;
    dto.type = transport.type;
    dto.price = transport.price;
    dto.brand = transport.brand;
    return dto;
  }

  static dtoToModel(transport: TransportDto): Transport {
    const model = new Transport();
    model.id = transport.id;
    model.name = transport.name;
    model.type = transport.type;
    model.price = transport.price;
    model.brand = transport.brand;
    return model;
  }
}
