import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LastBlocksComponent } from './components/last-blocks/last-blocks.component';
import { UnconfirmedTransactionsComponent } from './components/unconfirmed-transactions/unconfirmed-transactions.component';

@NgModule({
  declarations: [DashboardComponent, UnconfirmedTransactionsComponent, LastBlocksComponent],
  imports: [SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
