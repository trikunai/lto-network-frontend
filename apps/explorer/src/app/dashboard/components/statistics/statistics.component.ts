import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatisticsService } from '@lto/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'explorer-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [DatePipe]
})
export class StatisticsComponent implements OnInit {
  chartData$: Observable<any[]>;

  colors = [
    {
      name: 'Transactions',
      value: '#0366d6'
    }
  ];

  constructor(private _statsService: StatisticsService, private _datePipe: DatePipe) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    this.chartData$ = _statsService
      .transactions({
        startdate: _datePipe.transform(startDate, 'y-MM-dd') || '',
        enddate: _datePipe.transform(endDate, 'y-MM-dd') || ''
      })
      .pipe(
        map(statsData => {
          return [
            {
              name: 'Transactions',
              series: statsData.map(stat => ({
                value: stat.transactions,
                name: _datePipe.transform(stat.date, 'MMM d')
              }))
            }
          ];
        })
      );
  }

  ngOnInit() {}
}
