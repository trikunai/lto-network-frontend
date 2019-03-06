import { Component, OnInit } from '@angular/core';
import { TransactionsRepository, LtoAccount, Paginator } from '@lto/core';
import { AuthService } from '../core';
import { switchMap, filter, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

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

  transfersPaginator = new Paginator();
  massTransfersPaginator = new Paginator();

  transfers$ = combineLatest(this.address$, this.transfersPaginator.info$).pipe(
    switchMap(([address, pagination]) => {
      return this._transactionsRepo.list({
        address,
        index: 'transfer',
        offset: pagination.offset,
        limit: pagination.limit
      });
    })
  );

  constructor(private _auth: AuthService, private _transactionsRepo: TransactionsRepository) {}

  ngOnInit() {}

  loadTransfers() {}
}
