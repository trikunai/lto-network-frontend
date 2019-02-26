import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LtoPublicNodeServiceMock, EncoderServiceMock, StatisticsServiceMock } from './mocks';

@NgModule({
  imports: [HttpClientTestingModule],
  providers: [
    LtoPublicNodeServiceMock.provider,
    EncoderServiceMock.provider,
    StatisticsServiceMock.provider
  ]
})
export class CoreTestingModule {}
