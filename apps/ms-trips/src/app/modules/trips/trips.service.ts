import { Injectable } from '@nestjs/common';
import { TripsRepository } from './trips.repository';

@Injectable()
export class TripsService {
  constructor(private readonly tripsRepository: TripsRepository) {}
}
