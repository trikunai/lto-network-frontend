import { EncodePipe } from './encode.pipe';
import { EncoderServiceMock } from '@lto/core/testing';
import { EncoderService } from '@lto/core';

describe('EncodePipe', () => {
  let encoder: EncoderService;

  beforeEach(() => {
    encoder = new EncoderServiceMock();
  });

  it('create an instance', () => {
    const pipe = new EncodePipe(encoder);
    expect(pipe).toBeTruthy();
  });
});
