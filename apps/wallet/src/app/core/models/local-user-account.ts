export class LocalUserAccount {
  accountName: string;
  encryptedSeed: string;
  address: string;

  static fromJSON(data: Partial<LocalUserAccount>): LocalUserAccount {
    return new LocalUserAccount(data);
  }

  static fromArray(data: Partial<LocalUserAccount>[]): LocalUserAccount[] {
    return data.map(LocalUserAccount.fromJSON);
  }

  private constructor(data: Partial<LocalUserAccount>) {
    this.accountName = data.accountName || '';
    this.encryptedSeed = data.encryptedSeed || '';
    this.address = data.address || '';
  }
}
