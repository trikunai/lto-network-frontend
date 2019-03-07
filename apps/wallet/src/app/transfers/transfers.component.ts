import { Component, OnInit } from '@angular/core';
import { TransactionsRepository, LtoAccount, Paginator, TransactionType } from '@lto/core';
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

  TransactionType = TransactionType;

  dataProviders!: any[];

  constructor(private _auth: AuthService, private _transactionsRepo: TransactionsRepository) {}

  ngOnInit() {
    this.dataProviders = [TransactionType.TRANSFER, TransactionType.MASS_TRANSFER].map(type => {
      const paginator = new Paginator(5);
      const pageData$ = combineLatest(this.address$, paginator.info$).pipe(
        switchMap(([address, pagination]) => {
          return this._transactionsRepo.list({
            address,
            index: TransactionsRepository.indexForType(type),
            offset: pagination.offset,
            limit: pagination.limit
          });
        })
      );

      return {
        paginator,
        pageData$,
        type
      };
    });
  }

  loadTransfers() {}
}
