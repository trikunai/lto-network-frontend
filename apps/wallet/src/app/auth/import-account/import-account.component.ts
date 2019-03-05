import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalAccountsService, AuthService } from '../../core';
import { MatSnackBar } from '@angular/material';
import { LtoService } from '@lto/core';

@Component({
  selector: 'wallet-import-account',
  templateUrl: './import-account.component.html',
  styleUrls: ['./import-account.component.scss']
})
export class ImportAccountComponent implements OnInit {
  importForm!: FormGroup;

  constructor(
    private _localAccountsService: LocalAccountsService,
    private _authService: AuthService,
    private _ltoApi: LtoService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.importForm = new FormGroup({
      seedPhrase: new FormControl('', [Validators.required]),
      accountName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  importAccountAndRedirect() {
    if (this.importForm.invalid) {
      return;
    }
    try {
      const { seedPhrase, accountName, password } = this.importForm.value;

      const ltoAccount = this._ltoApi.createAccountFromExistingPhrase(seedPhrase);
      const userAccount = this._localAccountsService.createLocalAccount(
        ltoAccount,
        accountName,
        password
      );
      this._authService.login(userAccount, password);
      this._snackbar.open('Account imported', 'Dismiss');
      this._router.navigate(['/', 'transfers']);
    } catch (error) {
      this._snackbar.open('Unable to import account', 'Dismiss');
      console.error(error);
    }
  }
}
