export class TransactionStats {
  static fromJSON(apiData: LTO.StatsApi.Transaction[]): TransactionStats[];
  static fromJSON(apiData: LTO.StatsApi.Transaction): TransactionStats;
  static fromJSON(
    apiData: LTO.StatsApi.Transaction | LTO.StatsApi.Transaction[]
  ): TransactionStats | TransactionStats[] {
    if (Array.isArray(apiData)) {
      return apiData.map(StatsData => {
        return new TransactionStats(StatsData);
      });
    }

    return new TransactionStats(apiData);
  }

  get transactions(): number {
    return this._apiData.transactions;
  }

  get date(): string {
    return this._apiData.date;
  }

  protected constructor(protected _apiData: LTO.StatsApi.Transaction) {}
}
