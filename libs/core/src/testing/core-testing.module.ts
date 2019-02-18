import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LtoPublicNodeServiceMock, EncoderServiceMock } from './mocks';

@NgModule({
  imports: [HttpClientTestingModule],
  providers: [LtoPublicNodeServiceMock.provider, EncoderServiceMock.provider]
})
export class CoreTestingModule {}
