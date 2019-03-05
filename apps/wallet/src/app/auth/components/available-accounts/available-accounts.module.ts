import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatSelectModule, MatIconModule } from '@angular/material';
import { AvailableAccountsComponent } from './available-accounts.component';

@NgModule({
  declarations: [AvailableAccountsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [AvailableAccountsComponent]
})
export class AvailableAccountsModule {}
