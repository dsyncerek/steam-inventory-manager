import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/utils/custom-validators';

@Component({
  selector: 'bot-add-bot-form',
  templateUrl: './add-bot-form.component.html',
  styleUrls: ['./add-bot-form.component.scss'],
})
export class AddBotFormComponent {
  public form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      steamId: [null, [Validators.required, CustomValidators.steamId]],
      ownerSteamId: [null, CustomValidators.steamId],
      name: null,
      login: null,
      tradeLink: [null, [CustomValidators.tradeLink, Validators.required]],
      is2FA: false,
      isOnline: false,
    });
  }

  submit(): void {
    console.log(this.form.value);
  }
}
