import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LtoPublicNodeService,
  Transaction,
  Encoding,
  TransactionType,
  AnchorTransaction
} from '@lto/core';
import { switchMap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'explorer-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transaction$: Observable<Transaction>;
  hash$: Observable<string>;

  anchorsEncoding = Encoding.hex;
  Encoding = Encoding;
  TransactionType = TransactionType;

  constructor(private _route: ActivatedRoute, private _publicNode: LtoPublicNodeService) {
    this.transaction$ = _route.params.pipe(
      switchMap(params => _publicNode.transaction(params.transactionId))
    );

    this.hash$ = _route.queryParams.pipe(
      map(params => params['hash']),
      filter(hash => !!hash)
    );
  }

  ngOnInit() {}

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

  transactionHasAnchor(hash: string, transaction: AnchorTransaction) {
    return transaction.anchors.some(anchor => anchor === hash);
  }
}
