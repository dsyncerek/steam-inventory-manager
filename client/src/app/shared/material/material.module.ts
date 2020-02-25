import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonLgDirective } from './mat-button-lg.directive';

@NgModule({
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, horizontalPosition: 'right' } },
  ],
  declarations: [MatButtonLgDirective],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonLgDirective,
    MatSnackBarModule,
  ],
})
export class MaterialModule {}
