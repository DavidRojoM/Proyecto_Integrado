import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormOptions } from './interfaces/form-options.interface';
import { MyErrorStateMatcher } from '../../utils/ErrorStateMatcher';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export abstract class FormComponent {
  @Input() options!: FormOptions;
  @Output() public onSubmit = new EventEmitter();

  form: FormGroup;
  matcher!: MyErrorStateMatcher;

  protected constructor(
    public fb: FormBuilder,
    @Inject(Object)
    public readonly formValidations: { [key: string]: FormControl }
  ) {
    this.form = fb.group(formValidations);
  }

  sendAction() {
    if (!this.form.valid) {
      return;
    }
    this.onSubmit.emit(this.form.value);
  }
}
