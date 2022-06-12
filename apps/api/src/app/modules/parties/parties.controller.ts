import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { PartiesService } from './parties.service';
import {
  JoinPartyDto,
  PartyDto,
  UserPartyDto,
} from '@proyecto-integrado/shared';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Get()
  findAll(): Promise<PartyDto[]> {
    return this.partiesService.findAll();
  }

  @Post()
  create(@Body() party: PartyDto): Promise<PartyDto> {
    return this.partiesService.create(party);
  }

  @Post('join')
  joinParty(@Body() joinConfig: JoinPartyDto): Promise<UserPartyDto> {
    return this.partiesService.joinParty(joinConfig);
  }
}
