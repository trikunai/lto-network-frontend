import { TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '../../testing';
import { EncoderService, Encoding } from './encoder.service';

describe('core/EncoderService', () => {
  let encoderService: EncoderService;
  const TEST_CHARCODES = 'foo'.split('').map(c => c.charCodeAt(0));
  const DECODING_RESULT = new Uint8Array(TEST_CHARCODES);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule],
      providers: [EncoderService.provider]
    });

    encoderService = TestBed.get(EncoderService);
  });

  describe('#decode', () => {
    it('should decode HEX', () => {
      const hash = encoderService.hexEncode(TEST_CHARCODES);
      expect(encoderService.decode(hash, Encoding.hex)).toEqual(DECODING_RESULT);
    });

    it('should decode base64', () => {
      const hash = encoderService.base64Encode(TEST_CHARCODES);
      expect(encoderService.decode(hash, Encoding.base64)).toEqual(DECODING_RESULT);
    });

    it('should decode base58', () => {
      const hash = encoderService.base58Encode(TEST_CHARCODES);
      expect(encoderService.decode(hash, Encoding.base58)).toEqual(DECODING_RESULT);
    });
  });

  describe('#hexEncode', () => {
    it('should encode HEX', () => {
      expect(encoderService.hexEncode(TEST_CHARCODES)).toEqual('666f6f');
    });
  });

  describe('#hexDecode', () => {
    it('should decode HEX', () => {
      expect(encoderService.decode('666f6f', Encoding.hex)).toEqual(DECODING_RESULT);
    });

    it('should throw an error on invalid hex string', () => {
      expect(() => encoderService.decode('foo', Encoding.hex)).toThrow();
    });
  });

  describe('#base64Encode', () => {
    it('should encode to base64', () => {
      expect(encoderService.base64Encode(TEST_CHARCODES)).toEqual('Zm9v');
    });
  });

  describe('#base64Decode', () => {
    it('should decode base64 string', () => {
      const hash = encoderService.base64Encode(TEST_CHARCODES);
      expect(encoderService.base64Decode(hash)).toEqual(DECODING_RESULT);
    });
  });

  describe('#base58Encode', () => {
    it('should encode to base58 string', () => {
      expect(encoderService.base58Encode(TEST_CHARCODES)).toEqual('bQbp');
    });
  });

  describe('#base58Decode', () => {
    it('should decode base58 string', () => {
      const hash = encoderService.base58Encode(TEST_CHARCODES);
      expect(encoderService.base58Decode(hash)).toEqual(DECODING_RESULT);
    });
  });

  xdescribe('#validateSHA256', () => {
    it('should validate HEX', () => {});

    it('should validate base64', () => {});

    it('should validate base58', () => {});
  });
});
