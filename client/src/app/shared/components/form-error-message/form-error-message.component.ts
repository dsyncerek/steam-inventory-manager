import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss'],
})
export class FormErrorMessageComponent {
  @Input() control: AbstractControl;

  get message(): string {
    if (!this.control || !this.control.errors) {
      return null;
    }

    if (this.control.errors.required) {
      return `Field is required.`;
    }

    if (this.control.errors.email) {
      return `Field should be an email address.`;
    }

    if (this.control.errors.steamId) {
      return `Field should be a SteamID.`;
    }

    if (this.control.errors.tradeLink) {
      return `Field should be a Trade URL.`;
    }

    return null;
  }
}
