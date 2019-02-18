import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared';

import { BlocksRoutingModule } from './blocks-routing.module';
import { BlocksListComponent } from './blocks-list/blocks-list.component';
import { BlockDetailsComponent } from './block-details/block-details.component';

@NgModule({
  declarations: [BlocksListComponent, BlockDetailsComponent],
  imports: [SharedModule, BlocksRoutingModule, InfiniteScrollModule]
})
export class BlocksModule {}
