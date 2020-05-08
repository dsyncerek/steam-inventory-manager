import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bot } from '@bot/models/bot';
import { CustomValidators } from '@shared/utils/custom-validators';

@Component({
  selector: 'app-add-bot-form',
  templateUrl: './add-bot-form.component.html',
  styleUrls: ['./add-bot-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBotFormComponent {
  @Input() adding: boolean = false;
  @Input() error: string;
  @Output() addBot = new EventEmitter<Bot>();

  form: FormGroup = this.formBuilder.group({
    steamId: ['', [Validators.required, CustomValidators.steamId]],
    ownerSteamId: ['', CustomValidators.steamId],
    name: '',
    login: '',
    tradeLink: ['', CustomValidators.tradeLink],
    is2FA: false,
    isOnline: false,
  });

  tradeLinkHintLink = 'https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url';
  steamIdHintLink = 'https://steamidfinder.com';

  constructor(private readonly formBuilder: FormBuilder) {}

  submit(): void {
    if (this.form.valid) {
      const bot: Bot = { ...this.form.value };
      this.addBot.emit(bot);
    }
  }
}
