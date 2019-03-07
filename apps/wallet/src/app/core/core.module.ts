import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, LocalAccountsService } from './services';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [AuthService.provider, LocalAccountsService.provider]
})
export class CoreModule {}
