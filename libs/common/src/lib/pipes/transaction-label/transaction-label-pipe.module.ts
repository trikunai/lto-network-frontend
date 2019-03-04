import { NgModule } from '@angular/core';
import { TransactionLabelPipe } from './transaction-label.pipe';

@NgModule({
  declarations: [TransactionLabelPipe],
  exports: [TransactionLabelPipe]
})
export class TransactionLabelPipeModule {}
