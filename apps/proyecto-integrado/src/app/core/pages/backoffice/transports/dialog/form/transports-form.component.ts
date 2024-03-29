import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormModes } from '../../../../../../common/components/form/interfaces/form-modes.enum';
import { FormComponent } from '../../../../../../common/components/form/form.component';

@Component({
  selector: 'proyecto-integrado-transports-form',
  templateUrl: './transports-form.component.html',
  styleUrls: ['./transports-form.component.scss'],
})
export class TransportsFormComponent extends FormComponent implements OnInit {
  disabled!: boolean;
  types = ['BUS', 'PLANE', 'TRAIN'];

  constructor(override fb: FormBuilder) {
    super(fb, {
      id: new FormControl(''),
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      type: new FormControl('', [Validators.minLength(3), Validators.required]),
      brand: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      price: new FormControl('', [Validators.min(0), Validators.required]),
    });
  }

  ngOnInit(): void {
    this.disabled = this.options.mode === FormModes.VIEW;
    if (this.options.mode !== FormModes.ADD) {
      this.form.controls['id'].setValue(this.options.data['transport'].id);
      this.form.controls['name'].setValue(this.options.data['transport'].name);
      this.form.controls['type'].setValue(this.options.data['transport'].type);
      this.form.controls['brand'].setValue(
        this.options.data['transport'].brand
      );
      this.form.controls['price'].setValue(
        this.options.data['transport'].price
      );
    }
  }
}
