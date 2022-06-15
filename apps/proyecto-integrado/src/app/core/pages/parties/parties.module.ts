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

@NgModule({
  declarations: [
    PartiesComponent,
    PartyCardComponent,
    PartyComponent,
    ChatComponent,
    TripSelectorComponent,
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
