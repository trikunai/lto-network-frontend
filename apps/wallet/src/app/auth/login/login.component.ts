import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LocalAccountsService, LocalUserAccount, AuthService } from '../../core';
import { Observable } from 'rxjs';

@Component({
  selector: 'wallet-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  availableAccounts$!: Observable<LocalUserAccount[]>;

  constructor(
    private _localAccountsService: LocalAccountsService,
    private _authService: AuthService,
    private _router: Router,
    private _matSnackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.availableAccounts$ = this._localAccountsService.availableAccounts$;

    this.loginForm = new FormGroup({
      account: new FormControl('', []),
      password: new FormControl('')
    });
  }

  loginAndRedirect() {
    if (this.loginForm.invalid) {
      return;
    }
    try {
      const { account, password } = this.loginForm.value;
      this._authService.login(account, password);
      this._matSnackbar.open('Logged in', 'Dismiss');
      this._router.navigate(['/', 'transfers']);
    } catch (error) {
      this._matSnackbar.open('Invalid password', 'Dismiss');
    }
  }

  deleteAccount(account: LocalUserAccount) {
    const accountsLeft = this._localAccountsService.deleteLocalAccount(account);
    this._matSnackbar.open('Account has been deleted', 'Dismiss');
    if (accountsLeft === 0) {
      this._router.navigate(['/', 'auth', 'create']);
    }
  }
}
