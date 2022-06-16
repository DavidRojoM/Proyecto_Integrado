import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../state/interfaces/app.state.interface';
import {
  selectAllDestinations,
  selectAllHotels,
  selectAllTransports,
} from '../../../../../../state/selectors/trips/trips.selectors';
import { TripsActions } from '../../../../../../state/actions/trips/trips.actions';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import {
  Destination,
  Hotel,
  Transport,
  Trip,
} from '../../../../../shared/modules/trips/domain/trips.interface';
import {
  DestinationValidator,
  HotelValidator,
  TransportValidator,
} from '../../../../../shared/modules/country/domain/validators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'proyecto-integrado-trip-selector',
  templateUrl: './trip-selector.component.html',
  styleUrls: ['./trip-selector.component.scss'],
})
export class TripSelectorComponent implements OnInit {
  transports: Transport[] = [];
  filteredTransports$!: Observable<Transport[]>;

  destinations: Destination[] = [];
  filteredDestinations$!: Observable<Destination[]>;

  hotels: Hotel[] = [];
  filteredHotels$!: Observable<Hotel[]>;

  form = this.fb.group({
    transport: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    hotel: ['', [Validators.required]],
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
  });

  constructor(
    private readonly store$: Store<AppState>,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public party: { partyId: string }
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(TripsActions.getAllDestinationsRequest());
    this.store$.dispatch(TripsActions.getAllTransportsRequest());
    this.store$.dispatch(TripsActions.getAllHotelsRequest());

    this.fetchData();
  }

  selectTrip() {
    if (this.form.valid) {
      const { transport, destination, hotel, from, to } = this.form.value;
      const trip: Trip = {
        id: '',
        transport: this.transports.find((t) => t.name === transport),
        destination: this.destinations.find((d) => d.name === destination),
        hotel: this.hotels.find((h) => h.name === hotel),
        from: new Date(from),
        to: new Date(to),
      };
      this.store$.dispatch(
        TripsActions.createTripRequest({ trip, partyId: this.party.partyId })
      );
    }
  }

  private fetchData() {
    this.fetchTransports();
    this.fetchDestinations();
    this.fetchHotels();
  }

  private fetchTransports() {
    const transportsFormControl = this.form.get('transport') as AbstractControl;

    this.store$.select(selectAllTransports).subscribe((transports) => {
      this.transports = transports;
      transportsFormControl.setValidators(TransportValidator(transports));

      this.filteredTransports$ = transportsFormControl.valueChanges.pipe(
        startWith(''),
        map((value) =>
          value ? this.filterTransports(value) : this.transports.slice()
        )
      );
    });
  }

  private fetchDestinations() {
    const destinationsFormControl = this.form.get(
      'destination'
    ) as AbstractControl;

    this.store$.select(selectAllDestinations).subscribe((destinations) => {
      this.destinations = destinations;
      destinationsFormControl.setValidators(DestinationValidator(destinations));

      this.filteredDestinations$ = destinationsFormControl.valueChanges.pipe(
        startWith(''),
        map((value) =>
          value ? this.filterDestinations(value) : this.destinations.slice()
        )
      );
    });
  }

  private fetchHotels() {
    const hotelsFormControl = this.form.get('hotel') as AbstractControl;

    this.store$.select(selectAllHotels).subscribe((hotels) => {
      this.hotels = hotels;
      hotelsFormControl.setValidators(HotelValidator(hotels));

      this.filteredHotels$ = hotelsFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => (value ? this.filterHotels(value) : this.hotels.slice()))
      );
    });
  }

  private filterTransports(value: string): Transport[] {
    const filterValue = value.toLowerCase();

    return this.transports.filter((transport) =>
      transport.name.toLowerCase().includes(filterValue)
    );
  }

  private filterDestinations(value: string): Destination[] {
    const filterValue = value.toLowerCase();

    return this.destinations.filter((destination) =>
      destination.name.toLowerCase().includes(filterValue)
    );
  }

  private filterHotels(value: string): Hotel[] {
    const filterValue = value.toLowerCase();

    return this.hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(filterValue)
    );
  }
}
