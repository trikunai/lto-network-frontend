import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { LtoCommonModule, ClipboardButtonModule } from '@lto/common';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule
} from '@angular/material';
import { LineChartModule } from '@swimlane/ngx-charts';
import { NgSuspenseModule } from 'ng-suspense';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { BlocksTableComponent } from './components/blocks-table/blocks-table.component';
import { CardContentTableComponent } from './components/card-content-table/card-content-table.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  imports: [
    MatTableModule,
    RouterModule.forChild([]),
    LtoCommonModule,
    CommonModule,
    FlexLayoutModule,
    MatIconModule
  ],
  declarations: [
    TransactionsTableComponent,
    BlocksTableComponent,
    CardContentTableComponent,
    SearchComponent
  ],
  exports: [
    CommonModule,
    LtoCommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    FlexLayoutModule,
    NgSuspenseModule,
    TransactionsTableComponent,
    BlocksTableComponent,
    CardContentTableComponent,
    SearchComponent,
    MatSnackBarModule,
    LineChartModule,
    ClipboardButtonModule
  ]
})
export class SharedModule {}
