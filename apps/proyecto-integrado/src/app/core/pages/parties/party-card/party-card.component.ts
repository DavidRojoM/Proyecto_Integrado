import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PartyOutput } from '../../../shared/modules/parties/domain/parties.interface';
import { CountryService } from '../../../shared/modules/country/services/country.service';
import { User } from '../../../shared/modules/users/domain/interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'proyecto-integrado-party-card',
  templateUrl: './party-card.component.html',
  styleUrls: ['./party-card.component.scss'],
})
export class PartyCardComponent implements OnInit, OnDestroy {
  @Output() joinPartyEvent = new EventEmitter<string>();
  @Output() leavePartyEvent = new EventEmitter<string>();
  @Input() userInParty!: boolean;
  @Input() party!: PartyOutput;
  destinationName = '';

  organizer: User | undefined;

  subscriptions: Subscription[] = [];

  constructor(private readonly countryService: CountryService) {}

  ngOnInit(): void {
    this.destinationName = this.party?.trip?.destination?.name || '';
    const countryFlagSubscription = this.countryService
      .findOne(this.party.trip?.destination?.name as string)
      .subscribe((country) => {
        if (country?.flag) {
          this.destinationName += ` ${country?.flag as string}`;
        }
      });
    this.subscriptions = [...this.subscriptions, countryFlagSubscription];
    this.organizer = this.party.users.find(
      (user) => user.status === 'ORGANIZER'
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  joinParty() {
    if (this.party.status === 'READY') {
      return;
    }
    this.joinPartyEvent.emit(this.party.id);
  }

  leaveParty() {
    this.leavePartyEvent.emit(this.party.id);
  }
}
