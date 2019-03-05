import { Component, OnInit } from '@angular/core';
import { LocalAccountsService, AuthService } from '../../core';
import { LtoService } from '@lto/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Account } from 'lto-api';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'wallet-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  ltoAccount!: Account;

  newAccountForm!: FormGroup;

  constructor(
    private _ltoApi: LtoService,
    private _localUserAccountsServce: LocalAccountsService,
    private _authService: AuthService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.ltoAccount = this._ltoApi.generateLtoAccount();

    this.newAccountForm = new FormGroup({
      address: new FormControl({ value: this.ltoAccount.address, disabled: true }),
      accountName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  saveAccountAndLogin() {
    if (this.newAccountForm.invalid) {
      return;
    }
    try {
      const { accountName, password } = this.newAccountForm.value;
      const userAccount = this._localUserAccountsServce.createLocalAccount(
        this.ltoAccount,
        accountName,
        password
      );
      this._authService.login(userAccount, password);
      this._snackbar.open('Account created', 'Dismiss');
      this._router.navigate(['/', 'transfers']);
    } catch (error) {
      console.error(error);
      this._snackbar.open('Account creation error', 'Dismiss');
    }
  }
}
