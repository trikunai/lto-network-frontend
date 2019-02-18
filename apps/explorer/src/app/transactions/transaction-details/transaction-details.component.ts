import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LtoPublicNodeService, Transaction } from '@lto/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'explorer-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transaction$: Observable<Transaction>;

  constructor(private _route: ActivatedRoute, private _publicNode: LtoPublicNodeService) {
    this.transaction$ = _route.params.pipe(
      switchMap(params => _publicNode.transaction(params.transactionId))
    );
  }
  ngOnInit() {}
}
