import { ClassProvider } from '@angular/core';
import { StatisticsService } from '../../lib/services';
import { of } from 'rxjs';
import { transactionStats } from '../mocks';

export class StatisticsServiceMock implements StatisticsService {
  static provider: ClassProvider = {
    provide: StatisticsService,
    useClass: StatisticsServiceMock
  };

  transactions() {
    return of([transactionStats()]);
  }
}
