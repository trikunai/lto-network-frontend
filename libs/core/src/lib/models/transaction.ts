import { TransactionType } from './transaction-type';

export class Transaction {
  static fromJSON(apiData: LTO.API.Transaction[]): Transaction[];
  static fromJSON(apiData: LTO.API.Transaction): Transaction;
  static fromJSON(
    apiData: LTO.API.Transaction | LTO.API.Transaction[]
  ): Transaction | Transaction[] {
    if (Array.isArray(apiData)) {
      return apiData.map(transactionData => new Transaction(transactionData));
    }
    return new Transaction(apiData);
  }

  static group(transactions: Transaction[]): Map<TransactionType, Transaction[]> {
    return transactions.reduce((group, transaction) => {
      const transactionsOfType = group.get(transaction.type) || [];
      group.set(transaction.type, [...transactionsOfType, transaction]);

      return group;
    }, new Map());
  }

  get timestamp() {
    return this._apiData.timestamp;
  }

  get fee() {
    return this._apiData.fee;
  }

  get sender() {
    return this._apiData.sender;
  }

  get recipient() {
    return this._apiData.recipient || '';
  }

  get amount() {
    return this._apiData.amount;
  }

  get id() {
    return this._apiData.id;
  }

  get type(): TransactionType {
    return this._apiData.type;
  }

  get leaseId(): string {
    console.warn('Transaction model; TODO: Add leaseId');
    return '';
  }

  get block(): number {
    return this._apiData.height || 0;
  }

  get totalAmount(): number {
    console.warn('Transaction model; TODO: Add totalAmount');
    return 0;
  }

  get signature(): string {
    return this._apiData.proofs[0];
  }

  get anchors(): string[] {
    return this._apiData.anchors || [];
  }

  protected constructor(protected _apiData: LTO.API.Transaction) {}
}
