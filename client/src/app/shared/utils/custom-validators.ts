import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class CustomValidators {
  public static tradeLink(control: AbstractControl): ValidationErrors | null {
    const pattern = /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[\d\w]+&token=[\d\w]+$/;
    return Validators.pattern(pattern)(control) === null ? null : { tradeLink: true };
  }

  public static steamId(control: AbstractControl): ValidationErrors | null {
    const pattern = /^\d{17}$/;
    return Validators.pattern(pattern)(control) === null ? null : { steamId: true };
  }
}
