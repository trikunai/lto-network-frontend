import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export function toPromise(obs$: Observable<any>) {
  return obs$.pipe(take(1)).toPromise();
}
