import { PageEvent } from '@angular/material';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class Paginator {
  info$: Observable<{ limit: number; offset: number }>;

  get pageSize$(): Observable<number> {
    return this._limit$.asObservable();
  }

  private _page$: BehaviorSubject<number>;
  private _limit$: BehaviorSubject<number>;

  constructor(initialLimit = 25, initialOffset = 0) {
    this._page$ = new BehaviorSubject(initialOffset);
    this._limit$ = new BehaviorSubject(initialLimit);

    this.info$ = combineLatest(
      this._page$.pipe(distinctUntilChanged()),
      this._limit$.pipe(distinctUntilChanged())
    ).pipe(
      map(([page, limit]) => {
        return {
          limit,
          offset: limit * page
        };
      })
    );
  }

  update(evt: PageEvent) {
    this._page$.next(evt.pageIndex);
    this._limit$.next(evt.pageSize);
  }
}
