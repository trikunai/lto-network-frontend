import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '@lto/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const FAKE_DATA = [
  {
    name: 'Angola',
    series: [
      {
        value: 6368,
        name: '2016-09-16T19:02:02.135Z'
      },
      {
        value: 5179,
        name: '2016-09-19T14:20:16.971Z'
      },
      {
        value: 3229,
        name: '2016-09-23T12:29:18.265Z'
      },
      {
        value: 5857,
        name: '2016-09-20T18:18:59.075Z'
      },
      {
        value: 4380,
        name: '2016-09-22T23:04:40.121Z'
      }
    ]
  },
  {
    name: 'Philippines',
    series: [
      {
        value: 3232,
        name: '2016-09-16T19:02:02.135Z'
      },
      {
        value: 6198,
        name: '2016-09-19T14:20:16.971Z'
      },
      {
        value: 4003,
        name: '2016-09-23T12:29:18.265Z'
      },
      {
        value: 6576,
        name: '2016-09-20T18:18:59.075Z'
      },
      {
        value: 2832,
        name: '2016-09-22T23:04:40.121Z'
      }
    ]
  },
  {
    name: 'Canada',
    series: [
      {
        value: 4488,
        name: '2016-09-16T19:02:02.135Z'
      },
      {
        value: 2002,
        name: '2016-09-19T14:20:16.971Z'
      },
      {
        value: 6229,
        name: '2016-09-23T12:29:18.265Z'
      },
      {
        value: 4188,
        name: '2016-09-20T18:18:59.075Z'
      },
      {
        value: 2875,
        name: '2016-09-22T23:04:40.121Z'
      }
    ]
  },
  {
    name: 'Tonga',
    series: [
      {
        value: 5616,
        name: '2016-09-16T19:02:02.135Z'
      },
      {
        value: 5989,
        name: '2016-09-19T14:20:16.971Z'
      },
      {
        value: 6202,
        name: '2016-09-23T12:29:18.265Z'
      },
      {
        value: 5370,
        name: '2016-09-20T18:18:59.075Z'
      },
      {
        value: 5027,
        name: '2016-09-22T23:04:40.121Z'
      }
    ]
  },
  {
    name: 'Kenya',
    series: [
      {
        value: 5978,
        name: '2016-09-16T19:02:02.135Z'
      },
      {
        value: 2703,
        name: '2016-09-19T14:20:16.971Z'
      },
      {
        value: 5367,
        name: '2016-09-23T12:29:18.265Z'
      },
      {
        value: 5166,
        name: '2016-09-20T18:18:59.075Z'
      },
      {
        value: 4836,
        name: '2016-09-22T23:04:40.121Z'
      }
    ]
  }
];

@Component({
  selector: 'explorer-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  chartData$: Observable<any[]>;

  colors = [
    {
      name: 'Transactions',
      value: '#0366d6'
    }
  ];

  constructor(private _statsService: StatisticsService) {
    this.chartData$ = _statsService
      .transactions({ startDate: '2019-02-01', endDate: '2019-02-20' })
      .pipe(
        map(statsData => {
          return [
            {
              name: 'Transactions',
              series: statsData.map(stat => ({ value: stat.transactions, name: stat.date }))
            }
          ];
        })
      );
  }

  ngOnInit() {}
}
