import { Injectable, ClassProvider } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalUserAccount } from '../models';
import { LtoService } from '@lto/core';
import { Account } from 'lto-api';
import { LocalAccountsService } from './local-accounts.service';
import { map } from 'rxjs/operators';

@Injectable()
// tslint:disable:no-use-before-declare
export class AuthServiceImpl implements AuthService {
  activeUserAccount$: BehaviorSubject<LocalUserAccount | null> = new BehaviorSubject<LocalUserAccount | null>(
    null
  );
  activeLtoAccount$: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
  authenticated$ = this.activeUserAccount$.pipe(map(account => !!account));

  constructor(private _lto: LtoService, private _localAccountsService: LocalAccountsService) {}

  login(account: LocalUserAccount, password: string) {
    const decryptedSeedPhrase = this._lto.decryptSeedPhrase(account.encryptedSeed, password);
    const ltoAccount = this._lto.createAccountFromExistingPhrase(decryptedSeedPhrase);
    this.activeLtoAccount$.next(ltoAccount);
    this.activeUserAccount$.next(account);
  }

  logout() {
    this.activeLtoAccount$.next(null);
    this.activeUserAccount$.next(null);
  }
}

export abstract class AuthService {
  static provider: ClassProvider = {
    provide: AuthService,
    useClass: AuthServiceImpl
  };

  abstract activeUserAccount$: Observable<LocalUserAccount | null>;
  abstract activeLtoAccount$: Observable<Account | null>;
  abstract authenticated$: Observable<boolean>;

  abstract login(account: LocalUserAccount, password: string): void;
  abstract logout(): void;
}
