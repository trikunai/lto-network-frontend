import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  LtoCommonModule,
  ClipboardButtonModule,
  EncodePipeModule,
  LtoPipeModule,
  TransactionLabelPipeModule,
  ResponsiveTextModule,
  TransactionsTableModule,
  ContentSectionModule
} from '@lto/common';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule,
  MatPaginatorModule
} from '@angular/material';
import { LineChartModule } from '@swimlane/ngx-charts';
import { NgSuspenseModule } from 'ng-suspense';
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
    MatIconModule,
    EncodePipeModule,
    LtoPipeModule,
    TransactionLabelPipeModule,
    ResponsiveTextModule,
    TransactionsTableModule,
    ContentSectionModule
  ],
  declarations: [BlocksTableComponent, CardContentTableComponent, SearchComponent],
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
    BlocksTableComponent,
    CardContentTableComponent,
    SearchComponent,
    MatSnackBarModule,
    LineChartModule,
    ClipboardButtonModule,
    EncodePipeModule,
    LtoPipeModule,
    TransactionLabelPipeModule,
    ResponsiveTextModule,
    TransactionsTableModule,
    MatPaginatorModule,
    ContentSectionModule
  ]
})
export class SharedModule {}
