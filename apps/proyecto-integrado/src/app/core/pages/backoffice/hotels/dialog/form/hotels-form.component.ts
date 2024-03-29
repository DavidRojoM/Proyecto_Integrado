import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormModes } from '../../../../../../common/components/form/interfaces/form-modes.enum';
import { FormComponent } from '../../../../../../common/components/form/form.component';

@Component({
  selector: 'proyecto-integrado-hotels-form',
  templateUrl: './hotels-form.component.html',
  styleUrls: ['./hotels-form.component.scss'],
})
export class HotelsFormComponent extends FormComponent implements OnInit {
  disabled!: boolean;

  constructor(override fb: FormBuilder) {
    super(fb, {
      id: new FormControl(''),
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
      nightPrice: new FormControl('', [Validators.required, Validators.min(0)]),
      image: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.disabled = this.options.mode === FormModes.VIEW;
    if (this.options.mode !== FormModes.ADD) {
      this.form.controls['id'].setValue(this.options.data['hotel'].id);

      this.form.controls['name'].setValue(this.options.data['hotel'].name);
      this.form.controls['address'].setValue(
        this.options.data['hotel'].address
      );
      this.form.controls['phone'].setValue(this.options.data['hotel'].phone);
      this.form.controls['nightPrice'].setValue(
        this.options.data['hotel'].nightPrice
      );
    }
  }
}
