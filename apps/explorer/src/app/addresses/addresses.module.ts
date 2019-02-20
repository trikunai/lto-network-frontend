import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { AddressesRoutingModule } from './addresses-routing.module';
import { AddressDetailsComponent } from './address-details/address-details.component';

@NgModule({
  declarations: [AddressDetailsComponent],
  imports: [SharedModule, AddressesRoutingModule]
})
export class AddressesModule {}
