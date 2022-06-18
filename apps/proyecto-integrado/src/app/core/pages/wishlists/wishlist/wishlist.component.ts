import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Wishlist } from '../../../shared/modules/wishlists/domain/interfaces/wishlist.interface';
import { PartyOutput } from '../../../shared/modules/parties/domain/parties.interface';

@Component({
  selector: 'proyecto-integrado-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  @Input() wishlist!: Wishlist;
  @Input() parties!: PartyOutput[] | null;
  @Output() addToPartyEmitter = new EventEmitter<{
    userId: string;
    partyId: string;
  }>();

  addToParty(userId: string, partyId: string) {
    this.addToPartyEmitter.emit({ userId, partyId });
  }
}
