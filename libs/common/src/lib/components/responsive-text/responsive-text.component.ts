import { Component, OnInit, Input } from '@angular/core';
import { ScreenSize, ScreenService } from '../../services';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lto-responsive-text',
  template: `
    {{ text$ | async }}
  `,
  styles: []
})
export class ResponsiveTextComponent implements OnInit {
  @Input()
  set text(value: string) {
    this._textChange$.next(value);
  }

  @Input()
  set xs(value: number | string) {
    this._xs = parseInt(value.toString(), 10);
  }
  @Input()
  set sm(value: number | string) {
    this._sm = parseInt(value.toString(), 10);
  }
  @Input()
  set md(value: number | string) {
    this._md = parseInt(value.toString(), 10);
  }
  @Input()
  set lg(value: number | string) {
    this._lg = parseInt(value.toString(), 10);
  }
  @Input()
  set xl(value: number | string) {
    this._xl = parseInt(value.toString(), 10);
  }

  @Input() double = false;

  private _xs = 0;
  private _sm = 0;
  private _md = 0;
  private _lg = 0;
  private _xl = 0;

  text$: Observable<string>;
  private _textChange$ = new BehaviorSubject('');

  constructor(private _screen: ScreenService) {
    this.text$ = combineLatest(_screen.size$, this._textChange$).pipe(
      map(([screenSize, text]) => {
        return this._shortenString(text, screenSize);
      })
    );
  }

  ngOnInit() {}

  private _shortenString(value: string, screenSize: ScreenSize): string {
    const sliceSize = this._getSliceLength(screenSize);
    const isDouble = this._isDouble(screenSize);

    if (isDouble) {
      if (value.length <= sliceSize * 2) {
        return value;
      }
      return value.slice(0, sliceSize) + '...' + value.slice(-sliceSize);
    }

    if (sliceSize > value.length) {
      return value;
    }
    return value.slice(0, sliceSize) + '...';
  }

  private _getSliceLength(screenSize: ScreenSize): number {
    const sizes = [this._xs, this._sm, this._md, this._lg, this._xl];
    for (let i = screenSize; i <= ScreenSize.XL; i++) {
      if (sizes[i] > 0) {
        return sizes[i];
      }
    }

    return Number.MAX_SAFE_INTEGER;
  }

  private _isDouble(screenSize: ScreenSize): boolean {
    return this.double;
  }
}
