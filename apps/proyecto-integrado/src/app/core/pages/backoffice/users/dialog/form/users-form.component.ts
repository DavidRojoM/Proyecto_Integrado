import { Component, OnInit } from '@angular/core';
import { FormComponent } from 'apps/proyecto-integrado/src/app/common/components/form/form.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { CountryValidator } from '../../../../../shared/validators/validators';
import { Country } from '../../../../../shared/modules/country/domain/country.interface';
import { CountryService } from '../../../../../shared/modules/country/services/country.service';
import { FileValidators } from 'ngx-file-drag-drop';
import { FormModes } from '../../../../../../common/components/form/interfaces/form-modes.enum';

@Component({
  selector: 'proyecto-integrado-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent extends FormComponent implements OnInit {
  hidePassword = true;
  fileSize = 0;
  disabled!: boolean;
  filteredCountries!: Observable<Country[]>;
  countries: Country[] = [];
  roles = ['USER', 'ADMIN'];
  constructor(
    override fb: FormBuilder,
    private readonly countryService: CountryService
  ) {
    super(fb, {
      username: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
      ]),
      role: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      bankAccount: new FormControl('', [Validators.required]),
      image: new FormControl('', [FileValidators.maxFileCount(1)]),
    });
  }

  ngOnInit(): void {
    this.disabled = this.options.mode === FormModes.VIEW;

    if (this.options.mode !== FormModes.ADD) {
      this.form.controls['username'].setValue(
        this.options.data['user'].username
      );
      this.form.controls['email'].setValue(this.options.data['user'].email);
      this.form.controls['role'].setValue(this.options.data['user'].role);
      this.form.controls['nationality'].setValue(
        this.options.data['user'].nationality
      );
      this.form.controls['bankAccount'].setValue(
        this.options.data['user'].bankAccount
      );
    }

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
}
