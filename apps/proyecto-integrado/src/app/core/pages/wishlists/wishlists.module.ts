import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistsRoutingModule } from './wishlists-routing.module';
import { WishlistsComponent } from './wishlists.component';

@NgModule({
  declarations: [WishlistsComponent],
  imports: [CommonModule, WishlistsRoutingModule],
})
export class WishlistsModule {}
