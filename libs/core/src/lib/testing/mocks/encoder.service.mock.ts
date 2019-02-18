import { EncoderService } from '../../services';
import { ClassProvider } from '@angular/core';

export class EncoderServiceMock implements EncoderService {
  static provider: ClassProvider = {
    provide: EncoderService,
    useClass: EncoderServiceMock
  };

  base64Encode() {
    return 'foo';
  }

  base64Decode() {
    return new Uint8Array();
  }

  base58Encode() {
    return 'foo';
  }

  base58Decode() {
    return new Uint8Array();
  }

  hexEncode() {
    return 'foo';
  }

  hexDecode() {
    return new Uint8Array();
  }

  decode() {
    return new Uint8Array();
  }

  validateSHA256() {
    return true;
  }
}
