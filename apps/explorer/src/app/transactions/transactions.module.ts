import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

@NgModule({
  declarations: [TransactionDetailsComponent],
  imports: [SharedModule, TransactionsRoutingModule]
})
export class TransactionsModule {}
