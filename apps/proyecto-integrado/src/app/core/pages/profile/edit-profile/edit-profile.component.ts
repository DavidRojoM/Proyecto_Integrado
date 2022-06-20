import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../shared/modules/users/domain/interfaces/user.interface';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { FileValidators } from 'ngx-file-drag-drop';
import { map, Observable, startWith, tap } from 'rxjs';
import { CountryValidator } from '../../../shared/validators/validators';
import { Country } from '../../../shared/modules/country/domain/country.interface';
import { CountryService } from '../../../shared/modules/country/services/country.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/interfaces/app.state.interface';
import { AuthActions } from '../../../../state/actions/auth/auth.actions';

@Component({
  selector: 'proyecto-integrado-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  hidePassword = true;
  fileSize = 0;

  filteredCountries!: Observable<Country[]>;
  countries: Country[] = [];

  form = this.fb.group({
    id: new FormControl(''),
    username: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(4)]),
    nationality: new FormControl('', [Validators.required]),
    bankAccount: new FormControl('', [Validators.required]),
    image: new FormControl('', [
      FileValidators.maxFileCount(1),
      Validators.required,
    ]),
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly countryService: CountryService,
    private readonly store$: Store<AppState>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      me: User;
    }
  ) {}

  ngOnInit(): void {
    console.log(this.data.me);
    this.form.controls['id'].setValue(this.data['me'].id);
    this.form.controls['username'].setValue(this.data['me'].username);
    this.form.controls['email'].setValue(this.data['me'].email);
    this.form.controls['nationality'].setValue(this.data['me'].nationality);
    this.form.controls['bankAccount'].setValue(this.data['me'].bankAccount);

    const nationalityFormControl = this.form.get(
      'nationality'
    ) as AbstractControl;

    this.filteredCountries = this.countryService.findAll().pipe(
      tap((countries) => {
        this.countries = countries;
        nationalityFormControl.setValidators(CountryValidator(countries));

        this.filteredCountries = nationalityFormControl.valueChanges.pipe(
          startWith(''),
          map((country) =>
            country ? this.filterCountries(country) : this.countries.slice()
          )
        );
      })
    );
  }

  private filterCountries(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter((country) =>
      country.name.common.toLowerCase().includes(filterValue)
    );
  }

  onValueChange(files: File[]) {
    if (files.length) {
      this.fileSize = files[0].size;
    }
  }

  sendAction() {
    const user = {
      ...this.form.value,
    };

    if (this.form.valid) {
      this.store$.dispatch(AuthActions.updateUserRequest({ user }));
    }
  }
}
