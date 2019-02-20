import { Injectable } from '@angular/core';
import { LtoPublicNodeService } from '@lto/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private _node: LtoPublicNodeService) {}

  search(query: string): Observable<'block' | 'transaction' | 'address' | 'invalid'> {
    return combineLatest(
      this._node.block(query).pipe(catchError(() => of(null))),
      this._node.transaction(query).pipe(catchError(() => of(null))),
      this._node.balance(query).pipe(catchError(() => of(null)))
    ).pipe(
      map(([isBlock, isTransaction, isAddress]) => {
        if (isBlock) {
          return 'block';
        } else if (isTransaction) {
          return 'transaction';
        } else if (isAddress) {
          return 'address';
        }

        return 'invalid';
      })
    );
  }
}
