import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lto'
})
export class LtoPipe implements PipeTransform {
  readonly AMMOUNT_DIVIDER = 100000000;

  transform(value: number, args?: any): any {
    const result = value / this.AMMOUNT_DIVIDER;

    if (result.toString().indexOf('e') !== -1) {
      return result.toFixed(8);
    } else {
      return result.toString();
    }
  }
}
