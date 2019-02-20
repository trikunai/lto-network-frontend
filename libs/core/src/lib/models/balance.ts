export class Balance {
  static fromJSON(apiData: LTO.API.Balance): Balance {
    return new Balance(apiData);
  }

  get regular(): number {
    return this._apiData.regular;
  }

  get generating(): number {
    return this._apiData.generating;
  }

  get available(): number {
    return this._apiData.available;
  }

  get effective(): number {
    return this._apiData.effective;
  }

  protected constructor(private _apiData: LTO.API.Balance) {}
}
