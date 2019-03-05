import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ImportAccountComponent } from './import-account/import-account.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'create',
        component: CreateAccountComponent
      },
      {
        path: 'import',
        component: ImportAccountComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
