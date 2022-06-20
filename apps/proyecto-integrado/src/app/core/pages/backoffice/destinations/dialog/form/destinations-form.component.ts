import { Component, OnInit } from '@angular/core';
import { FormComponent } from 'apps/proyecto-integrado/src/app/common/components/form/form.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormModes } from '../../../../../../common/components/form/interfaces/form-modes.enum';

@Component({
  selector: 'proyecto-integrado-destinations-form',
  templateUrl: './destinations-form.component.html',
  styleUrls: ['./destinations-form.component.scss'],
})
export class DestinationsFormComponent extends FormComponent implements OnInit {
  disabled!: boolean;

  constructor(override fb: FormBuilder) {
    super(fb, {
      name: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
      ]),
    });
  }

  ngOnInit(): void {
    this.disabled = this.options.mode === FormModes.VIEW;
    if (this.options.mode !== FormModes.ADD) {
      this.form.controls['name'].setValue(
        this.options.data['destination'].name
      );
      this.form.controls['description'].setValue(
        this.options.data['destination'].description
      );
    }
  }
}
