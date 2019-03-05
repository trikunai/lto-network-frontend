import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { AuthRoutingModule } from './auth-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ImportAccountComponent } from './import-account/import-account.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AvailableAccountsModule } from './components/available-accounts/available-accounts.module';
import { PasswordFormFieldModule } from './components/password-form-field/password-form-field.module';

@NgModule({
  declarations: [CreateAccountComponent, ImportAccountComponent, LoginComponent, AuthComponent],
  imports: [SharedModule, AuthRoutingModule, AvailableAccountsModule, PasswordFormFieldModule]
})
export class AuthModule {}
