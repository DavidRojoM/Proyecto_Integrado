import { Component, Input, OnInit } from '@angular/core';
import { PartyOutput } from '../../../shared/modules/parties/domain/parties.interface';
import { CountryService } from '../../../shared/modules/country/services/country.service';
import { User } from '../../../shared/modules/users/domain/interfaces/user.interface';

@Component({
  selector: 'proyecto-integrado-party-card',
  templateUrl: './party-card.component.html',
  styleUrls: ['./party-card.component.scss'],
})
export class PartyCardComponent implements OnInit {
  @Input() userInParty!: boolean;
  @Input() party!: PartyOutput;
  countryFlag!: string;
  pendingUsers: User[] = [];
  readyUsers: User[] = [];

  organizer: User | undefined;

  constructor(private readonly countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService
      .findOne(this.party.trip?.destination?.name as string)
      .subscribe((country) => {
        this.countryFlag = country?.flag as string;
      });
    this.pendingUsers = this.party.users.filter(
      (user) => user.status === 'PENDING'
    );
    this.readyUsers = this.party.users.filter(
      (user) => user.status === 'READY'
    );
    this.organizer = this.party.users.find(
      (user) => user.status === 'ORGANIZER'
    );
  }

  // joinParty(partyId: string): {};
  //
  // leaveParty(partyId: string): {};
}
