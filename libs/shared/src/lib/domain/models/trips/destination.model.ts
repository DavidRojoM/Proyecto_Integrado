import { DestinationDto } from '../../dto/trips/destination.dto';
import { DestinationEntity } from '../../../database/entities/destination.entity';

export class Destination {
  id?: number;
  name: string;
  description: string;

  static modelToEntity(destination: Destination): DestinationEntity {
    const entity = new DestinationEntity();
    entity.name = destination.name;
    entity.description = destination.description;
    return entity;
  }

  static entityToModel(destination: DestinationEntity): Destination {
    const model = new Destination();
    model.id = destination.id;
    model.name = destination.name;
    model.description = destination.description;
    return model;
  }

  static modelToDto(destination: Destination): DestinationDto {
    const dto = new DestinationDto();
    dto.id = destination.id;
    dto.name = destination.name;
    dto.description = destination.description;
    return dto;
  }

  static dtoToModel(destination: DestinationDto): Destination {
    const model = new Destination();
    model.id = destination.id;
    model.name = destination.name;
    model.description = destination.description;
    return model;
  }
}
