import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CoreModule as LtoCoreModule, LTO_NETWORK_BYTE } from '@lto/core';
import { environment } from '../environments/environment';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AuthGuard } from './core/guards';

import { AppComponent } from './app.component';
import { LoggedInWrapperComponent } from './components/logged-in-wrapper/logged-in-wrapper.component';

@NgModule({
  declarations: [AppComponent, LoggedInWrapperComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    LtoCoreModule.forRoot({
      publicNodeHost: environment.ltoPublicNodeHost
    }),
    RouterModule.forRoot([
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      },
      {
        path: '',
        component: LoggedInWrapperComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'transfers',
            loadChildren: './transfers/transfers.module#TransfersModule'
          }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
      }
    ])
  ],
  providers: [
    {
      provide: LTO_NETWORK_BYTE,
      useValue: environment.ltoNetworkByte
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
