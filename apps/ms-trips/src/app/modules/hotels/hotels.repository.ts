import { EntityRepository, Repository } from 'typeorm';
import { HotelEntity } from '@proyecto-integrado/shared';

@EntityRepository(HotelEntity)
export class HotelsRepository extends Repository<HotelEntity> {}
