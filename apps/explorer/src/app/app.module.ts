import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { CoreModule as LtoCoreModule } from '@lto/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    LtoCoreModule.forRoot({
      publicNodeHost: environment.ltoPublicNodeHost
    }),
    RouterModule.forRoot(
      [
        {
          path: 'dashboard',
          loadChildren: './dashboard/dashboard.module#DashboardModule'
        },
        {
          path: 'blocks',
          loadChildren: './blocks/blocks.module#BlocksModule'
        },
        {
          path: 'addresses',
          loadChildren: './addresses/addresses.module#AddressesModule'
        },
        {
          path: 'transactions',
          loadChildren: './transactions/transactions.module#TransactionsModule'
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'dashboard'
        }
      ],
      { initialNavigation: 'enabled' }
    ),
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
