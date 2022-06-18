import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PartiesService } from './parties.service';
import {
  AddTripPartyResponseDto,
  AddTripToPartyDto,
  CheckoutResponseDto,
  JoinPartyDto,
  PartyDto,
  UserPartyDto,
} from '@proyecto-integrado/shared';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { CheckoutDto } from '@proyecto-integrado/shared';

@UseInterceptors(LoggingInterceptor, AuthInterceptor)
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

  @Post('leave')
  leaveParty(
    @Body() leaveConfig: JoinPartyDto
  ): Promise<{ userId: string; partyId: string }> {
    return this.partiesService.leaveParty(leaveConfig);
  }

  @Post('organizer')
  joinAsOrganizer(@Body() joinConfig: JoinPartyDto): Promise<UserPartyDto> {
    return this.partiesService.joinAsOrganizer(joinConfig);
  }

  @Post('trip')
  addTrip(
    @Body() addTripConfig: AddTripToPartyDto
  ): Promise<AddTripPartyResponseDto> {
    return this.partiesService.addTrip(addTripConfig);
  }

  @Post('checkout')
  checkout(@Body() checkoutConfig: CheckoutDto): Promise<CheckoutResponseDto> {
    return this.partiesService.checkout(checkoutConfig);
  }

  @Delete()
  cancelCheckout(
    @Body() cancelCheckoutConfig: CheckoutDto
  ): Promise<CheckoutResponseDto> {
    return this.partiesService.cancelCheckout(cancelCheckoutConfig);
  }

  @Post('confirm/:partyId')
  confirm(@Param('partyId') partyId: string): Promise<UserPartyDto> {
    return this.partiesService.confirm(partyId);
  }
}
