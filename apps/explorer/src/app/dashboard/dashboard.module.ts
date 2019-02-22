import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LastBlocksComponent } from './components/last-blocks/last-blocks.component';
import { UnconfirmedTransactionsComponent } from './components/unconfirmed-transactions/unconfirmed-transactions.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [DashboardComponent, UnconfirmedTransactionsComponent, LastBlocksComponent, StatisticsComponent],
  imports: [SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
