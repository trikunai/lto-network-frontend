import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { TransfersRoutingModule } from './transfers-routing.module';
import { TransfersComponent } from './transfers.component';

@NgModule({
  declarations: [TransfersComponent],
  imports: [SharedModule, TransfersRoutingModule]
})
export class TransfersModule {}
