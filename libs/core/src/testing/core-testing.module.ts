import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EncoderService } from '../lib/services';
import { LtoPublicNodeServiceMock, StatisticsServiceMock } from './mocks';

@NgModule({
  imports: [HttpClientTestingModule],
  providers: [
    LtoPublicNodeServiceMock.provider,
    EncoderService.provider,
    StatisticsServiceMock.provider
  ]
})
export class CoreTestingModule {}
