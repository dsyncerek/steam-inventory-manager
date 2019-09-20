import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FlexLayoutModule, RouterModule, MaterialModule],
  exports: [CommonModule, ReactiveFormsModule, HttpClientModule, FlexLayoutModule, RouterModule, MaterialModule],
})
export class SharedModule {}
