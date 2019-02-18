import { Block, BlockHeader, Transaction, Balance } from '../../models';
import { LtoPublicNodeService } from '../../services';
import { of } from 'rxjs';
import * as api from './api.mock';
import { ClassProvider } from '@angular/core';

export class LtoPublicNodeServiceMock implements LtoPublicNodeService {
  static provider: ClassProvider = {
    provide: LtoPublicNodeService,
    useClass: LtoPublicNodeServiceMock
  };

  nodeVersion() {
    return of('TEST v0.0.1');
  }

  blocksHeight() {
    return of(1000);
  }

  blockHeaders() {
    return of(BlockHeader.fromJSON([api.blockHeader(), api.blockHeader(), api.blockHeader()]));
  }

  block() {
    return of(Block.fromJSON(api.block()));
  }

  transaction() {
    return of(Transaction.fromJSON(api.transaction()));
  }

  transactions() {
    return of(Transaction.fromJSON([api.transaction(), api.transaction(), api.transaction()]));
  }

  balance() {
    return of(Balance.fromJSON(api.balance()));
  }

  unconfirmed() {
    return of(Transaction.fromJSON([api.transaction(), api.transaction(), api.transaction()]));
  }
}
