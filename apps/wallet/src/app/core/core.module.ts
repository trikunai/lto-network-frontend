import { NgModule } from '@angular/core';
import { AuthService, LocalAccountsService } from './services';

@NgModule({
  declarations: [],
  providers: [AuthService.provider, LocalAccountsService.provider]
})
export class CoreModule {}
