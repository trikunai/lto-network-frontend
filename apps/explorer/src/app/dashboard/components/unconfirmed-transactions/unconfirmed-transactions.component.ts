import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LtoPublicNodeService, Transaction } from '@lto/core';
import { Observable, timer, of } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'explorer-unconfirmed-transactions',
  templateUrl: './unconfirmed-transactions.component.html',
  styleUrls: ['./unconfirmed-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnconfirmedTransactionsComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  visibleColumns$: Observable<string[]> = of(['id', 'fee', 'amount']);

  constructor(private _publicNode: LtoPublicNodeService) {
    this.transactions$ = timer(0, 3000).pipe(switchMapTo(_publicNode.unconfirmed()));
  }

  ngOnInit() {}
}
