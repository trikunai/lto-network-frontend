import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LtoPublicNodeService, Balance, TransactionType, TransactionsRepository } from '@lto/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

const VISIBLE_TYPES = [
  TransactionType.TRANSFER,
  TransactionType.MASS_TRANSFER,
  TransactionType.LEASE,
  TransactionType.CANCEL_LEASE,
  TransactionType.ANCHOR
];

@Component({
  selector: 'explorer-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent {
  address$ = this._route.params.pipe(map(params => params.address));
  balance$: Observable<Balance>;

  TransactionType = TransactionType;

  transactions$ = this.address$.pipe(map(address => this.createSources(address)));

  constructor(
    private _route: ActivatedRoute,
    private _publicNode: LtoPublicNodeService,
    private _transactionsRepo: TransactionsRepository
  ) {
    this.address$ = _route.params.pipe(map(params => params.address));
    this.balance$ = this.address$.pipe(switchMap(address => _publicNode.balance(address)));
  }

  createSources(address: string) {
    return VISIBLE_TYPES.map(type => {
      const page$ = new BehaviorSubject(0);
      const limit$ = new BehaviorSubject(25);
      const pageData$ = combineLatest(
        page$.pipe(distinctUntilChanged()),
        limit$.pipe(distinctUntilChanged())
      ).pipe(
        switchMap(([page, limit]) => {
          return this._transactionsRepo.list({
            address,
            index: TransactionsRepository.indexForType(type),
            limit,
            offset: page * limit
          });
        }),
        shareReplay(1)
      );

      return {
        type,
        page$,
        limit$,
        pageData$,
        update: (evt: PageEvent) => {
          limit$.next(evt.pageSize);
          page$.next(evt.pageIndex);
        }
      };
    });
  }
}
