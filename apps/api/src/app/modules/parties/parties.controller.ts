import { Body, Controller, Get, Post } from '@nestjs/common';
import { PartiesService } from './parties.service';
import {
  JoinPartyDto,
  PartyDto,
  UserPartyDto,
} from '@proyecto-integrado/shared';

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
