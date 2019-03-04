import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { LtoPipeModule } from '../../pipes';
import { ResponsiveTextModule } from '../responsive-text';
import { TransactionsTableComponent } from './transactions-table.component';

@NgModule({
  declarations: [TransactionsTableComponent],
  imports: [CommonModule, LtoPipeModule, ResponsiveTextModule, MatTableModule],
  exports: [TransactionsTableComponent]
})
export class TransactionsTableModule {}
