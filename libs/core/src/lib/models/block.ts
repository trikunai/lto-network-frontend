import { Transaction } from './transaction';

export class Block {
  transactions: Transaction[];
  get version(): number {
    return this._apiData.version;
  }

  get timestamp(): number {
    return this._apiData.timestamp;
  }

  get parent(): string {
    return this._apiData.reference;
  }

  get generator(): string {
    return this._apiData.generator;
  }

  get signature(): string {
    return this._apiData.signature;
  }

  get size(): number {
    return this._apiData.blocksize;
  }

  get hasConsesuns(): boolean {
    return !!this._apiData['nxt-consensus'];
  }

  get baseTarget(): number {
    return this._apiData['nxt-consensus'] ? this._apiData['nxt-consensus']['base-target'] : 0;
  }

  get groupedTransactions() {
    return Transaction.group(this.transactions);
  }

  static fromJSON(data: LTO.API.Block[]): Block[];
  static fromJSON(data: LTO.API.Block): Block;
  static fromJSON(data: LTO.API.Block | LTO.API.Block[]): Block | Block[] {
    if (Array.isArray(data)) {
      return data.map(blockData => new Block(blockData));
    }
    return new Block(data);
  }

  protected constructor(protected _apiData: LTO.API.Block) {
    this.transactions = Transaction.fromJSON(_apiData.transactions);
  }
}
