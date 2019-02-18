import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { BlocksListComponent } from './blocks-list/blocks-list.component';
import { BlockDetailsComponent } from './block-details/block-details.component';

@NgModule({
  declarations: [BlocksListComponent, BlockDetailsComponent],
  imports: [
    CommonModule,
    BlocksRoutingModule
  ]
})
export class BlocksModule { }
