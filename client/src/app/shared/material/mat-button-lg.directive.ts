import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[mat-lg-button]' })
export class MatButtonLgDirective {
  @HostBinding('style.height')
  height: string = '59.5px';
}
