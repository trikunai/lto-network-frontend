import { Injectable, ClassProvider } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export enum ScreenMode {
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP'
}

/**
 * Screen sizes. This is "number" enum because very often
 * we need to comprare size to each other.
 */
export enum ScreenSize {
  XS,
  SM,
  MD,
  LG,
  XL
}

@Injectable({ providedIn: 'root' })
export class ScreenService {
  size$: Observable<ScreenSize>;
  mode$: Observable<ScreenMode>;

  get size() {
    return this._size;
  }

  get mode() {
    return this._mode;
  }

  private _size = ScreenSize.XL;
  private _mode = ScreenMode.DESKTOP;

  constructor(media: MediaObserver) {
    this.size$ = media.media$.pipe(
      map(change => {
        switch (change.mqAlias) {
          case 'xs':
            return ScreenSize.XS;
          case 'sm':
            return ScreenSize.SM;
          case 'md':
            return ScreenSize.MD;
          case 'lg':
            return ScreenSize.LG;
          case 'xl':
            return ScreenSize.XL;
          default:
            return ScreenSize.LG;
        }
      }),
      shareReplay()
    );
    this.mode$ = this.size$.pipe(
      map(size => {
        switch (size) {
          case ScreenSize.XS:
          case ScreenSize.SM:
            return ScreenMode.MOBILE;
          default:
            return ScreenMode.DESKTOP;
        }
      })
    );

    this.size$.subscribe(size => (this._size = size));
    this.mode$.subscribe(mode => (this._mode = mode));
  }
}
