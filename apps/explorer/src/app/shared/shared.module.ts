import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatMenuModule
} from '@angular/material';
import { ComponentsModule } from '@lto/components';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ComponentsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
