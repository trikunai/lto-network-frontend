import * as faker from 'faker';

export function blockHeader(preset: Partial<LTO.API.BlockHeader> = {}): LTO.API.BlockHeader {
  return {
    version: 1,
    timestamp: 77777777,
    reference: faker.random.uuid(),
    features: [],
    generator: faker.random.uuid(),
    signature: faker.random.uuid(),
    blocksize: faker.random.number(1000),
    transactionCount: faker.random.number(10),
    height: faker.random.number(1000),
    'nxt-consensus': {
      'base-target': faker.random.number(1000),
      'generation-signature': faker.random.uuid()
    },
    ...preset
  };
}

export function block(preset: Partial<LTO.API.Block> = {}): LTO.API.Block {
  return {
    ...blockHeader(preset),
    transactions: [],
    fee: faker.random.number(10000),
    ...preset
  };
}

export function transaction(preset: Partial<LTO.API.Transaction> = {}): LTO.API.Transaction {
  return {
    type: faker.random.number({ min: 4, max: 14 }) as any,
    id: faker.random.uuid(),
    sender: faker.random.uuid(),
    senderPublicKey: faker.random.uuid(),
    fee: faker.random.number(1000000),
    timestamp: faker.date.past().getTime(),
    proofs: [],
    version: 1,
    anchors: [],
    ...preset
  };
}

export function balance(preset: Partial<LTO.API.Balance> = {}): LTO.API.Balance {
  return {
    address: faker.random.uuid(),
    regular: 100000,
    generating: 100000,
    available: 100000,
    effective: 100000,
    ...preset
  };
}
