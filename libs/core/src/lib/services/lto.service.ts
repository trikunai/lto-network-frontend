import { Injectable, Inject, ClassProvider } from '@angular/core';
import { LTO, Account } from 'lto-api';
import { LTO_NETWORK_BYTE } from '../tokens';

@Injectable()
// tslint:disable:no-use-before-declare
export class LtoServiceImpl implements LtoService {
  private _lto: LTO;

  constructor(@Inject(LTO_NETWORK_BYTE) networkByte: 'L' | 'T') {
    this._lto = new LTO(networkByte);
  }

  decryptSeedPhrase(encryptedSeedPhrase: string, password: string): string {
    return this._lto.decryptSeedPhrase(encryptedSeedPhrase, password);
  }

  createAccountFromExistingPhrase(seedPhrase: string): Account {
    return this._lto.createAccountFromExistingPhrase(seedPhrase);
  }

  generateLtoAccount(): Account {
    return this._lto.createAccount();
  }
}

export abstract class LtoService {
  static provider: ClassProvider = {
    provide: LtoService,
    useClass: LtoServiceImpl
  };

  abstract decryptSeedPhrase(encryptedSeedPhrase: string, password: string): string;
  abstract createAccountFromExistingPhrase(seedPhrase: string): Account;
  abstract generateLtoAccount(): Account;
}
