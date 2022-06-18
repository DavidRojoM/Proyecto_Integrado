import {
  Destination,
  GenderEnum,
  User,
  WishlistDto,
  WishlistEntity,
} from '@proyecto-integrado/shared';

export class Wishlist {
  id: number;
  user: User;
  ageFilter?: number;
  genderFilter?: GenderEnum;
  departureFilter?: Date;
  destination: Destination;

  static dtoToModel(dto: WishlistDto): Wishlist {
    const model = new Wishlist();
    model.ageFilter = dto.ageFilter;
    model.departureFilter = dto.departureFilter;
    model.genderFilter = dto.genderFilter;
    return model;
  }

  static modelToDto(model: Wishlist): WishlistDto {
    const dto = new WishlistDto();
    dto.ageFilter = model.ageFilter;
    dto.departureFilter = model.departureFilter;
    dto.genderFilter = model.genderFilter;
    dto.userId = model.user.id;
    dto.destinationId = model.destination.id;
    return dto;
  }

  static modelToEntity(model: Wishlist): WishlistEntity {
    const entity = new WishlistEntity();
    entity.ageFilter = model.ageFilter;
    entity.departureFilter = model.departureFilter;
    entity.genderFilter = model.genderFilter;
    if (model.user) {
      entity.user = User.modelToEntity(model.user);
    }
    if (model.destination) {
      entity.destination = Destination.modelToEntity(model.destination);
    }
    return entity;
  }

  static entityToModel(entity: WishlistEntity): Wishlist {
    const model = new Wishlist();
    model.id = entity.id;
    if (entity.ageFilter) {
      model.ageFilter = entity.ageFilter;
    }
    if (entity.departureFilter) {
      model.departureFilter = entity.departureFilter;
    }
    if (entity.genderFilter) {
      model.genderFilter = entity.genderFilter;
    }
    if (entity.user) {
      model.user = User.entityToModel(entity.user);
    }
    if (entity.destination) {
      model.destination = Destination.entityToModel(entity.destination);
    }
    return model;
  }
}
