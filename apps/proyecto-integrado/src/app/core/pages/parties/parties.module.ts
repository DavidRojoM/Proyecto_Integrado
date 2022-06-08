import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartiesRoutingModule } from './parties-routing.module';
import { PartiesComponent } from './parties.component';

@NgModule({
  declarations: [PartiesComponent],
  imports: [CommonModule, PartiesRoutingModule],
})
export class PartiesModule {}
