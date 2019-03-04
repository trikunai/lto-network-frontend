import { TransactionsRepository } from '../../lib/repositories';
import { of } from 'rxjs';
import * as api from './api.mock';
import { Transaction } from '../../lib/models';
import { ClassProvider } from '@angular/core';

export class TransactionsRepositoryMock implements TransactionsRepository {
  static provider: ClassProvider = {
    provide: TransactionsRepository,
    useClass: TransactionsRepositoryMock
  };

  get(id: string) {
    return of(Transaction.fromJSON(api.transaction()));
  }

  list() {
    return of({
      total: 100,
      transactions: [
        Transaction.fromJSON(api.transaction()),
        Transaction.fromJSON(api.transaction())
      ]
    });
  }

  unconfirmed() {
    return of([Transaction.fromJSON(api.transaction()), Transaction.fromJSON(api.transaction())]);
  }

  last() {
    return of([Transaction.fromJSON(api.transaction()), Transaction.fromJSON(api.transaction())]);
  }
}
