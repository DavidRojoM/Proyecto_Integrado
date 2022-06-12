import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageOutput } from '../../../../shared/modules/comms/domain/message.interface';
import { User } from '../../../../shared/modules/users/domain/interfaces/user.interface';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'proyecto-integrado-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() messages$!: Observable<MessageOutput[]>;
  @Input() me!: User;

  @Output() sendMessageEmitter = new EventEmitter<string>();

  form = this.fb.group({
    message: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  sendMessage(event: SubmitEvent) {
    event.preventDefault();
    if (!this.form.valid) {
      return;
    }
    this.sendMessageEmitter.emit(this.form.value.message);
    this.form.reset();
  }
}
