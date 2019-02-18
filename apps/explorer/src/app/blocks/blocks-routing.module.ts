import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlocksListComponent } from './blocks-list/blocks-list.component';
import { BlockDetailsComponent } from './block-details/block-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlocksListComponent
  },
  {
    path: ':blockId',
    component: BlockDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocksRoutingModule {}
