export class Balance {
  static fromJSON(apiData: LTO.API.Balance): Balance {
    return new Balance(apiData);
  }

  protected constructor(private _data: LTO.API.Balance) {}
}
