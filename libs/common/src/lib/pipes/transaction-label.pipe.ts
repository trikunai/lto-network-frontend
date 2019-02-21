import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '@lto/core';

@Pipe({
  name: 'transactionLabel'
})
export class TransactionLabelPipe implements PipeTransform {
  transform(type: TransactionType): string {
    switch (type) {
      case TransactionType.TRANSFER:
        return 'Transfer';
      case TransactionType.MASS_TRANSFER:
        return 'Mass transfer';
      case TransactionType.LEASE:
        return 'Lease';
      case TransactionType.CANCEL_LEASE:
        return 'Lease cancel';
      case TransactionType.DATA:
        return 'Data';
      case TransactionType.ANCHOR:
        return 'Anchor';
    }
  }
}
