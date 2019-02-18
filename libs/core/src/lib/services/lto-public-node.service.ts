import { Injectable, InjectionToken, Inject, ClassProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction, Balance, Block } from '../models';
import { BlockHeader } from '../models/block-header';

export const LTO_PUBLIC_NODE_HOST = new InjectionToken<string>('LTO_PUBLIC_NODE_HOST');

@Injectable()
// tslint:disable:no-use-before-declare
export class LtoPublicNodeServiceImpl implements LtoPublicNodeService {
  constructor(private _http: HttpClient, @Inject(LTO_PUBLIC_NODE_HOST) private _host: string) {}

  nodeVersion() {
    return this._http
      .get<LTO.API.Version>(`${this._host}/node/version`)
      .pipe(map(data => data.version));
  }

  blocksHeight() {
    return this._http
      .get<LTO.API.BlockHeight>(`${this._host}/blocks/height`)
      .pipe(map(data => data.height));
  }

  blockHeaders(height: number, count: number) {
    let from = height - count;
    from = from < 0 ? 0 : from; // On new/test node we can as more headers than generated
    const url = `${this._host}/blocks/headers/seq/${from}/${height}`;
    return this._http.get<LTO.API.BlockHeader[]>(url).pipe(map(data => BlockHeader.fromJSON(data)));
  }

  block(height: number | string) {
    return this._http
      .get<LTO.API.Block>(`${this._host}/blocks/at/${height}`)
      .pipe(map(apiData => Block.fromJSON(apiData)));
  }

  transaction(id: string) {
    return this._http
      .get<LTO.API.Transaction>(`${this._host}/transactions/info/${id}`)
      .pipe(map(apiData => Transaction.fromJSON(apiData)));
  }

  transactions(address: string, limit: number) {
    return this._http
      .get<LTO.API.Transaction[]>(`${this._host}/transactions/address/${address}/limit/${limit}`)
      .pipe(map(apiData => Transaction.fromJSON(apiData)));
  }

  balance(address: string) {
    return this._http
      .get<LTO.API.Balance>(`${this._host}/addresses/balance/details/${address}`)
      .pipe(map(apiData => Balance.fromJSON(apiData)));
  }

  unconfirmed() {
    return this._http
      .get<LTO.API.Transaction[]>(`${this._host}/transactions/unconfirmed`)
      .pipe(map(apiData => Transaction.fromJSON(apiData)));
  }
}

export abstract class LtoPublicNodeService {
  static readonly provider: ClassProvider = {
    provide: LtoPublicNodeService,
    useClass: LtoPublicNodeServiceImpl
  };

  abstract nodeVersion(): Observable<string>;
  abstract blocksHeight(): Observable<number>;
  abstract blockHeaders(height: number, count: number): Observable<BlockHeader[]>;
  abstract block(height: number | string): Observable<Block>;
  abstract transaction(id: string): Observable<Transaction>;
  abstract transactions(address: string, limit: number): Observable<Transaction[]>;
  abstract balance(address: string): Observable<Balance>;
  abstract unconfirmed(): Observable<Transaction[]>;
}
