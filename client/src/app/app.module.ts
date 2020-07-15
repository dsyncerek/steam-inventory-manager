import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { CoreModule } from '@core/core.module';
import { HomePageComponent } from '@features/home-page/home-page.component';
import { NotFoundPageComponent } from '@features/not-found-page/not-found-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule, CoreModule, AppRoutingModule],
  declarations: [AppComponent, NotFoundPageComponent, HomePageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
