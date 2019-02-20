import { TransactionLabelPipe } from './transaction-label.pipe';

describe('TransactionLabelPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionLabelPipe();
    expect(pipe).toBeTruthy();
  });
});
