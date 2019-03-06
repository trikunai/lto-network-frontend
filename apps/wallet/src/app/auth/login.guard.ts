import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalAccountsService } from '../core';
import { of } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

/**
 * Redirect to /create if no local accounts
 */
@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private _localAccounts: LocalAccountsService, private _router: Router) {}

  canActivate() {
    return this._localAccounts.availableAccounts$.pipe(
      take(1),
      map(accounts => accounts.length !== 0),
      tap(haveAccounts => {
        if (!haveAccounts) {
          this._router.navigate(['/', 'auth', 'create']);
        }
      })
    );
  }
}
