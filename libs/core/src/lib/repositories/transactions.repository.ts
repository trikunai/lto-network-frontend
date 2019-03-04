import { Injectable, ClassProvider, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction, TransactionType } from '../models';
import { HttpClient } from '@angular/common/http';
import { LTO_PUBLIC_NODE_HOST } from '../tokens';

export type TransactionSearchIndex =
  | 'all_transfers'
  | 'transfer'
  | 'mass_transfer'
  | 'anchor'
  | 'start_lease'
  | 'cancel_lease';

interface TransactionsListConfig {
  address: string;
  index: TransactionSearchIndex;
  limit: number;
  offset: number;
}

@Injectable()
// tslint:disable:no-use-before-declare
export class TransactionsRepositoryImpl implements TransactionsRepository {
  constructor(private _http: HttpClient, @Inject(LTO_PUBLIC_NODE_HOST) private _host: string) {}
  get(id: string) {
    return this._http
      .get<LTO.API.Transaction>(`${this._host}/transactions/info/${id}`)
      .pipe(map(apiData => Transaction.fromJSON(apiData)));
  }

  list({ address, index, limit = 25, offset = 0 }: TransactionsListConfig) {
    return this._http
      .get<LTO.API.Transaction[]>(`${this._host}/index/transactions/addresses/${address}`, {
        observe: 'response',
        params: {
          type: index,
          limit,
          offset
        } as any
      })
      .pipe(
        map(response => {
          const total = parseInt(response.headers.get('x-total') || '0', 10);
          const transactions = response.body ? Transaction.fromJSON(response.body) : [];
          return {
            transactions,
            total
          };
        })
      );
  }

  unconfirmed() {
    return this._http
      .get<LTO.API.Transaction[]>(`${this._host}/transactions/unconfirmed`)
      .pipe(map(apiData => Transaction.fromJSON(apiData)));
  }

  last(address: string, limit: number) {
    return this._http
      .get<LTO.API.Transaction[][]>(`${this._host}/transactions/address/${address}/limit/${limit}`)
      .pipe(map(apiData => Transaction.fromJSON(apiData[0])));
  }
}

export abstract class TransactionsRepository {
  static provider: ClassProvider = {
    provide: TransactionsRepository,
    useClass: TransactionsRepositoryImpl
  };

  static indexForType(transactionType: TransactionType): TransactionSearchIndex {
    switch (transactionType) {
      case TransactionType.TRANSFER:
        return 'transfer';
      case TransactionType.MASS_TRANSFER:
        return 'mass_transfer';
      case TransactionType.ANCHOR:
        return 'anchor';
      case TransactionType.LEASE:
        return 'start_lease';
      case TransactionType.CANCEL_LEASE:
        return 'cancel_lease';
    }

    throw new Error(`No index for ${transactionType}`);
  }

  abstract get(id: string): Observable<Transaction>;
  abstract list(
    config: TransactionsListConfig
  ): Observable<{
    transactions: Transaction[];
    total: number;
  }>;
  abstract unconfirmed(): Observable<Transaction[]>;
  abstract last(address: string, limit: number): Observable<Transaction[]>;
}
