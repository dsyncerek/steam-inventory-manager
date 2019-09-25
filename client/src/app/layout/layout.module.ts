import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LayoutComponent, SidebarComponent],
  exports: [LayoutComponent, SidebarComponent],
})
export class LayoutModule {}
