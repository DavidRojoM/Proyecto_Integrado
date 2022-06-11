import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartiesRoutingModule } from './parties-routing.module';
import { PartiesComponent } from './parties.component';
import { PartyCardComponent } from './party-card/party-card.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { PartyComponent } from '../party/party.component';

@NgModule({
  declarations: [PartiesComponent, PartyCardComponent, PartyComponent],
  imports: [CommonModule, PartiesRoutingModule, MaterialModule],
  providers: [],
})
export class PartiesModule {}
