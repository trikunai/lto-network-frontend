import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared';
import { CoreTestingModule } from '@lto/core/testing';
import { LastBlocksComponent } from './components/last-blocks/last-blocks.component';
import { UnconfirmedTransactionsComponent } from './components/unconfirmed-transactions/unconfirmed-transactions.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

import { DashboardComponent } from './dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule, SharedModule, NoopAnimationsModule],
      declarations: [
        DashboardComponent,
        UnconfirmedTransactionsComponent,
        LastBlocksComponent,
        StatisticsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
