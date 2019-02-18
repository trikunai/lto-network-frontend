import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

const routes: Routes = [
  {
    path: ':transactionId',
    component: TransactionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
