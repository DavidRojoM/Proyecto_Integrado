import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'proyecto-integrado-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loginEmitter = new EventEmitter();

  hidePassword = true;

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder) {}

  login() {
    if (this.form.valid) {
      this.loginEmitter.emit(this.form.value);
    }
  }
}
