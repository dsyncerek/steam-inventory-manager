import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';

@NgModule({
  exports: [BrowserModule, CommonModule, ReactiveFormsModule, HttpClientModule, FlexLayoutModule, MaterialModule],
})
export class SharedModule {}
