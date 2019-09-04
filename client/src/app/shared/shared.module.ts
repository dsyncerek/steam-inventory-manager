import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

@NgModule({
  exports: [ReactiveFormsModule, HttpClientModule, FlexLayoutModule, MaterialModule],
})
export class SharedModule {}
