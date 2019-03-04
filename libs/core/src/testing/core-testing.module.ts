import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EncoderService } from '../lib/services';
import {
  LtoPublicNodeServiceMock,
  StatisticsServiceMock,
  TransactionsRepositoryMock
} from './mocks';

@NgModule({
  imports: [HttpClientTestingModule],
  providers: [
    LtoPublicNodeServiceMock.provider,
    EncoderService.provider,
    StatisticsServiceMock.provider,
    TransactionsRepositoryMock.provider
  ]
})
export class CoreTestingModule {}
