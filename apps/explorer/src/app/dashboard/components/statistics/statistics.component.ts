import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatisticsService, TransactionsStatsConfig } from '@lto/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export enum Granularity {
  Last7Days = 'Last 7 days',
  Today = 'Today'
}

@Component({
  selector: 'explorer-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [DatePipe]
})
export class StatisticsComponent {
  colors = [
    {
      name: 'Transactions',
      value: '#0366d6'
    }
  ];

  Granularity = Granularity;
  granularity$ = new BehaviorSubject(Granularity.Last7Days);
  chartData$ = this.granularity$.pipe(
    switchMap(granularity => {
      return this._statsService.transactions(this.getStatsQueryConfig(granularity)).pipe(
        map(statsData => {
          return [
            {
              name: 'Transactions',
              series: statsData.map(stat => ({
                value: stat.transactions,
                name: this._datePipe.transform(
                  stat.date,
                  granularity === Granularity.Last7Days ? 'MMM d' : 'HH'
                )
              }))
            }
          ];
        })
      );
    })
  );

  constructor(private _statsService: StatisticsService, private _datePipe: DatePipe) {}

  setGranularity(granularity: Granularity) {
    this.granularity$.next(granularity);
  }

  getStatsQueryConfig(granularity: Granularity): TransactionsStatsConfig {
    const now = new Date();
    const endDate = new Date();
    const startDate = new Date();
    if (granularity === Granularity.Last7Days) {
      endDate.setDate(now.getDate() - 1);
      startDate.setDate(endDate.getDate() - 7);
    } else {
      endDate.setHours(now.getHours() - 2);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
    }

    return {
      startdate: startDate.toString(),
      enddate: endDate.toString(),
      granularity: granularity === Granularity.Last7Days ? 'day' : 'hour'
    };
  }
}
