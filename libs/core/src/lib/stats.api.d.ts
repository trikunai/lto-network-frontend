declare namespace LTO.StatsApi {
  export interface Health {}

  export interface Transaction {
    transactions: number;
    date: string;
  }
}
