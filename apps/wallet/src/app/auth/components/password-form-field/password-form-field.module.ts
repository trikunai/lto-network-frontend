import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
} from '@angular/material';
import { PasswordFormFieldComponent } from './password-form-field.component';

@NgModule({
  declarations: [PasswordFormFieldComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  exports: [PasswordFormFieldComponent]
})
export class PasswordFormFieldModule {}
