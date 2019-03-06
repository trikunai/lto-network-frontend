import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSuspenseModule } from 'ng-suspense';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatSelectModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
  MatSidenavModule
} from '@angular/material';
import { ContentSectionModule, TransactionsTableModule, ResponsiveTextModule } from '@lto/common';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ContentSectionModule,
    MatSidenavModule,
    TransactionsTableModule,
    NgSuspenseModule,
    ResponsiveTextModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000
      } as MatSnackBarConfig
    }
  ]
})
export class SharedModule {}
