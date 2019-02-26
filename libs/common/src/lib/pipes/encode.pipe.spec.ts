import { EncodePipe } from './encode.pipe';

import { EncoderService } from '@lto/core';
import { TestBed } from '@angular/core/testing';

describe('EncodePipe', () => {
  let pipe: EncodePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncodePipe, EncoderService.provider]
    });

    pipe = TestBed.get(EncodePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
