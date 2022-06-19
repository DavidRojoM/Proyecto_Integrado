import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartiesRoutingModule } from './parties-routing.module';
import { PartiesComponent } from './parties.component';
import { PartyCardComponent } from './party-card/party-card.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { PartyComponent } from './party/party.component';
import { ChatComponent } from './party/chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TripSelectorComponent } from './party/trip-dialog/trip-selector/trip-selector.component';
import { AddPartyDialogComponent } from './add-party-dialog/add-party-dialog.component';
import { UserStatusPipe } from '../../shared/pipes/user-status.pipe';

@NgModule({
  declarations: [
    UserStatusPipe,
    PartiesComponent,
    PartyCardComponent,
    PartyComponent,
    ChatComponent,
    TripSelectorComponent,
    AddPartyDialogComponent,
  ],
  imports: [
    CommonModule,
    PartiesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
})
export class PartiesModule {}
