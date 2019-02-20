import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressDetailsComponent } from './address-details/address-details.component';

const routes: Routes = [
  {
    path: ':address',
    component: AddressDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressesRoutingModule {}
