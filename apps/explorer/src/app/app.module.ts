import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { CoreModule as LtoCoreModule, LTO_STATS_HOST } from '@lto/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
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
          path: 'block',
          loadChildren: './blocks/blocks.module#BlocksModule'
        },
        {
          path: 'addresses',
          loadChildren: './addresses/addresses.module#AddressesModule'
        },
        {
          path: 'address',
          loadChildren: './addresses/addresses.module#AddressesModule'
        },
        {
          path: 'transactions',
          loadChildren: './transactions/transactions.module#TransactionsModule'
        },
        {
          path: 'transaction',
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
  providers: [
    {
      provide: LTO_STATS_HOST,
      useValue: environment.statsHost
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
