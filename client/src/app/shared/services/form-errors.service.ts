import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormErrorsService {
  getControlErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);

    if (!control || !control.errors) {
      return null;
    }

    if (control.errors.required) {
      return `Field is required.`;
    }

    if (control.errors.email) {
      return `Field should be an email address.`;
    }

    if (control.errors.steamId) {
      return `Field should be a SteamID.`;
    }

    if (control.errors.tradeLink) {
      return `Field should be a Trade URL.`;
    }

    return null;
  }
}
