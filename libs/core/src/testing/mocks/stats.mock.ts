import * as faker from 'faker';
import { TransactionStats } from '../../lib/models';

export function transactionStats(preset: Partial<LTO.StatsApi.Transaction> = {}): TransactionStats {
  return TransactionStats.fromJSON({
    transactions: 10,
    date: faker.date.past().toDateString(),
    ...preset
  });
}
