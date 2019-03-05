import { Injectable, ClassProvider } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LocalUserAccount } from '../models';
import { map, startWith, shareReplay } from 'rxjs/operators';
import { Account } from 'lto-api';

@Injectable()
// tslint:disable:no-use-before-declare
export class LocalAccountsServiceImpl implements LocalAccountsService {
  private _LS_KEY = '__LOCAL_ACCOUNTS__';

  availableAccounts$: Observable<LocalUserAccount[]>;

  private _update = new Subject();

  constructor() {
    this.availableAccounts$ = this._update.pipe(
      startWith(null),
      map(() => {
        return this._readLocalAccountsFromLocalStorage();
      }),
      shareReplay(1)
    );
  }

  createLocalAccount(ltoAccount: Account, accountName: string, password: string): LocalUserAccount {
    const encryptedSeed = ltoAccount.encryptSeed(password);
    const userAccount = LocalUserAccount.fromJSON({
      accountName,
      encryptedSeed,
      address: ltoAccount.address
    });
    this._saveLocalAccount(userAccount);

    return userAccount;
  }

  private _saveLocalAccount(account: LocalUserAccount) {
    const accounts = this._readLocalAccountsFromLocalStorage();
    this._saveLocalAccounts([account, ...accounts]);
    this._update.next();
  }

  deleteLocalAccount(accountToDelete: LocalUserAccount) {
    const accounts = this._readLocalAccountsFromLocalStorage().filter(
      account => account.address !== accountToDelete.address
    );
    this._saveLocalAccounts(accounts);
    this._update.next();

    return accounts.length;
  }

  private _readLocalAccountsFromLocalStorage(): LocalUserAccount[] {
    const dataString = window.localStorage.getItem(this._LS_KEY) || '[]';
    const data = JSON.parse(dataString);
    return LocalUserAccount.fromArray(data || ([] as any));
  }

  private _saveLocalAccounts(accounts: LocalUserAccount[]) {
    window.localStorage.setItem(this._LS_KEY, JSON.stringify(accounts));
  }
}

export abstract class LocalAccountsService {
  static provider: ClassProvider = {
    provide: LocalAccountsService,
    useClass: LocalAccountsServiceImpl
  };

  abstract availableAccounts$: Observable<LocalUserAccount[]>;
  abstract createLocalAccount(
    ltoAccount: Account,
    accountName: string,
    password: string
  ): LocalUserAccount;
  abstract deleteLocalAccount(accountToDelete: LocalUserAccount): number;
}
