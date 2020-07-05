import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';

@NgModule({
  imports: [SharedModule],
  exports: [ProfileSummaryComponent],
  declarations: [ProfileSummaryComponent],
})
export class UserModule {}
