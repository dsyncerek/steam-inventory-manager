import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../../shared/utils/custom-validators';

@Component({
  selector: 'bot-edit-bot-form',
  templateUrl: './edit-bot-form.component.html',
  styleUrls: ['./edit-bot-form.component.scss'],
})
export class EditBotFormComponent {
  public form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: null,
      login: null,
      tradeLink: [null, CustomValidators.tradeLink],
      is2FA: false,
      isOnline: false,
    });
  }

  submit(): void {
    console.log(this.form.value);
  }
}
