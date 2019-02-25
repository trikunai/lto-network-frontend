import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LtoPublicNodeService, Transaction, Encoding, TransactionType } from '@lto/core';
import { switchMap, map, filter, withLatestFrom, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'explorer-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent {
  transaction$: Observable<Transaction>;
  receipt$: Observable<{ hash: string; valid: boolean }>;

  anchorsEncoding = Encoding.hex;
  Encoding = Encoding;
  TransactionType = TransactionType;

  constructor(_route: ActivatedRoute, _publicNode: LtoPublicNodeService) {
    this.transaction$ = _route.params.pipe(
      switchMap(params => _publicNode.transaction(params.transactionId)),
      shareReplay(1)
    );

    this.receipt$ = _route.queryParams.pipe(
      map(params => params['hash']),
      filter(hash => !!hash),
      withLatestFrom(this.transaction$),
      map(([hash, transaction]) => {
        return {
          hash,
          valid: transaction.anchors.some(anchor => anchor === hash)
        };
      })
    );
  }

  setAnchorsEncoding(encoding: Encoding) {
    this.anchorsEncoding = encoding;
  }

  showAmount(transaction: Transaction): boolean {
    switch (transaction.type) {
      case TransactionType.TRANSFER:
      case TransactionType.MASS_TRANSFER:
      case TransactionType.LEASE:
        return true;
    }

    return false;
  }
}
