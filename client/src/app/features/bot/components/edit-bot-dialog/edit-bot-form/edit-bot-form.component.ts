import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Bot } from '@bot/models/bot';
import { CustomValidators } from '@shared/utils/custom-validators';

@Component({
  selector: 'app-edit-bot-form',
  templateUrl: './edit-bot-form.component.html',
  styleUrls: ['./edit-bot-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBotFormComponent implements OnChanges {
  @Input() bot: Bot;
  @Input() editing: boolean = false;
  @Output() editBot = new EventEmitter<Bot>();

  form: FormGroup = this.formBuilder.group({
    steamId: { value: '', disabled: true },
    name: '',
    login: '',
    tradeLink: ['', CustomValidators.tradeLink],
    is2FA: false,
    isOnline: false,
  });

  tradeLinkHintLink = 'https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url';

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bot) {
      this.form.patchValue({ ...this.bot });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const bot: Bot = { ...this.bot, ...this.form.value };
      this.editBot.emit(bot);
    }
  }
}
