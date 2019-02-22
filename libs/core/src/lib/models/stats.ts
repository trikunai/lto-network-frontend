export class Stats {
  static fromJSON(apiData: LTO.StatsApi.Transaction[]): Stats[];
  static fromJSON(apiData: LTO.StatsApi.Transaction): Stats;
  static fromJSON(apiData: LTO.StatsApi.Transaction | LTO.StatsApi.Transaction[]): Stats | Stats[] {
    if (Array.isArray(apiData)) {
      return apiData.map(StatsData => {
        return new Stats(StatsData);
      });
    }

    return new Stats(apiData);
  }

  get transactions(): number {
    return this._apiData.transactions;
  }

  get date(): string {
    return this._apiData.date;
  }

  protected constructor(protected _apiData: LTO.StatsApi.Transaction) {}
}
