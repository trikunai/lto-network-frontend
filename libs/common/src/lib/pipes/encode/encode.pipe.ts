import { Pipe, PipeTransform } from '@angular/core';
import { EncoderService, Encoding } from '@lto/core';

@Pipe({
  name: 'encode'
})
export class EncodePipe implements PipeTransform {
  constructor(private _encoder: EncoderService) {}

  transform(value: string, target: Encoding, current: Encoding = Encoding.base58): any {
    const valueBuffer = Array.from(this._encoder.decode(value, current));
    switch (target) {
      case Encoding.hex:
        return this._encoder.hexEncode(valueBuffer);
      case Encoding.base58:
        return this._encoder.base58Encode(valueBuffer);
      case Encoding.base64:
        return this._encoder.base64Encode(valueBuffer);
    }

    throw new Error(`Invalid target encoding: ${target}`);
  }
}
