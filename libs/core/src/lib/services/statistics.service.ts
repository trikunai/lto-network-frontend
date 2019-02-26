import { Injectable, InjectionToken, Inject, ClassProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionStats, TransactionType } from '../models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const LTO_STATS_HOST = new InjectionToken<string>('LTO_STATS_HOST');

interface TransactionsStatsConfig {
  startdate: string;
  enddate: string;
  granularity?: 'sec' | 'hour' | 'day';
  type?: TransactionType;
}

@Injectable()
export class StatisticsServiceImpl {
  constructor(private _http: HttpClient, @Inject(LTO_STATS_HOST) private _host: string) {}

  transactions(config: TransactionsStatsConfig) {
    const requestConfig = {
      type: TransactionType.ANCHOR,
      granularity: 'day',
      ...config
    };
    return this._http
      .get<LTO.StatsApi.Transaction[]>(`${this._host}/transactions`, {
        params: requestConfig as any
      })
      .pipe(map(stats => TransactionStats.fromJSON(stats)));
  }
}

export abstract class StatisticsService {
  static provider: ClassProvider = {
    provide: StatisticsService,
    useClass: StatisticsServiceImpl
  };

  abstract transactions(config: TransactionsStatsConfig): Observable<TransactionStats[]>;
}
