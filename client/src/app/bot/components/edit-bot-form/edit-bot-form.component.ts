import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormErrorsService } from '../../../shared/services/form-errors.service';
import { CustomValidators } from '../../../shared/utils/custom-validators';
import { Bot } from '../../models/bot';

@Component({
  selector: 'app-edit-bot-form',
  templateUrl: './edit-bot-form.component.html',
  styleUrls: ['./edit-bot-form.component.scss'],
})
export class EditBotFormComponent implements OnInit, OnChanges {
  @Input() bot: Bot;
  @Output() editBot = new EventEmitter<Bot>();

  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly formErrors: FormErrorsService) {
    this.form = this.formBuilder.group({
      name: '',
      login: '',
      tradeLink: ['', CustomValidators.tradeLink],
      is2FA: false,
      isOnline: false,
    });
  }

  ngOnInit(): void {
    this.form.patchValue({ ...this.bot });
  }

  ngOnChanges(): void {
    this.form.patchValue({ ...this.bot });
  }

  submit(): void {
    if (this.form.valid) {
      const bot: Bot = { ...this.bot, ...this.form.value };
      this.editBot.emit(bot);
    }
  }

  getControlErrorMessage(controlName: string): string {
    return this.formErrors.getControlErrorMessage(this.form, controlName);
  }
}
