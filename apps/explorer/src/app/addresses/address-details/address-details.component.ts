import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LtoPublicNodeService, Balance, Transaction, TransactionType } from '@lto/core';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'explorer-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {
  address$: Observable<string>;
  balance$: Observable<Balance>;
  transactions$: Observable<Map<TransactionType, Transaction[]>>;

  constructor(private _route: ActivatedRoute, private _publicNode: LtoPublicNodeService) {
    this.address$ = _route.params.pipe(map(params => params.address));
    this.balance$ = this.address$.pipe(switchMap(address => _publicNode.balance(address)));
    this.transactions$ = this.address$.pipe(
      switchMap(address => _publicNode.transactions(address, 100)),
      map(transactions => Transaction.group(transactions))
    );
  }

  ngOnInit() {}
}
