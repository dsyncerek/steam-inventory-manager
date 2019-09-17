import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class CustomValidators {
  static tradeLink(control: AbstractControl): ValidationErrors | null {
    const pattern = '^https:\\/\\/steamcommunity.com\\/tradeoffer\\/new\\/\\?partner=\\d+&token=[\\d\\w]+$';
    return Validators.pattern(pattern)(control);
  }

  static steamId(control: AbstractControl): ValidationErrors | null {
    const pattern = '^\\d{17}$';
    return Validators.pattern(pattern)(control);
  }
}
