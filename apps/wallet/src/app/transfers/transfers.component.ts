import { Component, OnInit } from '@angular/core';
import { TransactionsRepository, LtoAccount, Transaction } from '@lto/core';
import { AuthService } from '../core';
import { switchMap, filter, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'wallet-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  address$ = this._auth.activeLtoAccount$.pipe(
    filter((account): account is LtoAccount => !!account),
    map(account => account.address)
  );

  transfers$ = this.address$.pipe(
    switchMap(address => {
      return this._transactionsRepo.list({
        address,
        index: 'all_transfers',
        offset: 0,
        limit: 100
      });
    })
  );

  columns$ = of(['direction', 'id', 'type', 'sender', 'recipient', 'timestamp', 'amount', 'fee']);

  constructor(private _auth: AuthService, private _transactionsRepo: TransactionsRepository) {}

  ngOnInit() {}
}
