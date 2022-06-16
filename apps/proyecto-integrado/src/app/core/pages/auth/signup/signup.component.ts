import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CountryService } from '../../../shared/modules/country/services/country.service';
import { Country } from '../../../shared/modules/country/domain/country.interface';
import { CountryValidator } from '../../../shared/modules/country/domain/validators';
import { FileValidators } from 'ngx-file-drag-drop';
import { User } from '../../../shared/modules/users/domain/interfaces/user.interface';

@Component({
  selector: 'proyecto-integrado-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Output() signupEmitter = new EventEmitter<User>();

  hidePassword = true;

  fileSize = 0;

  filteredCountries!: Observable<Country[]>;
  countries: Country[] = [];

  firstFormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
  secondFormGroup = this.fb.group({
    nationality: ['', [Validators.required]],
    bankAccount: ['', [Validators.required]],
  });
  thirdFormGroup = this.fb.group({
    image: ['', FileValidators.maxFileCount(1)],
  });

  stepperOrientation: Observable<any>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly countryService: CountryService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 1400px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    const nationalityFormControl = this.secondFormGroup.get(
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

  signUp() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid
    ) {
      const user = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
      };

      this.signupEmitter.emit(user);
      this.firstFormGroup.reset();
      this.secondFormGroup.reset();
      this.thirdFormGroup.reset();
    }
  }

  onValueChange(files: File[]) {
    if (files.length) {
      this.fileSize = files[0].size;
    }
  }
}
