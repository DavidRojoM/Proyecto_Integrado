import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistsRoutingModule } from './wishlists-routing.module';
import { WishlistsComponent } from './wishlists.component';
import { AddWishlistDialogComponent } from './add-wishlist-dialog/add-wishlist-dialog.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { GenderPipe } from '../../shared/pipes/gender.pipe';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    WishlistsComponent,
    AddWishlistDialogComponent,
    GenderPipe,
    WishlistComponent,
  ],
  imports: [
    CommonModule,
    WishlistsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class WishlistsModule {}
