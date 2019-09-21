import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorsService } from '../../../shared/services/form-errors.service';
import { CustomValidators } from '../../../shared/utils/custom-validators';
import { Bot } from '../../models/bot';

@Component({
  selector: 'app-add-bot-form',
  templateUrl: './add-bot-form.component.html',
  styleUrls: ['./add-bot-form.component.scss'],
})
export class AddBotFormComponent {
  @Output() addBot = new EventEmitter<Bot>();

  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly formErrors: FormErrorsService) {
    this.form = this.formBuilder.group({
      steamId: ['', [Validators.required, CustomValidators.steamId]],
      ownerSteamId: ['', CustomValidators.steamId],
      name: '',
      login: '',
      tradeLink: ['', CustomValidators.tradeLink],
      is2FA: false,
      isOnline: false,
    });
  }

  submit(): void {
    if (this.form.valid) {
      const bot: Bot = { ...this.form.value };
      this.addBot.emit(bot);
    }
  }

  getControlErrorMessage(controlName: string): string {
    return this.formErrors.getControlErrorMessage(this.form, controlName);
  }
}
