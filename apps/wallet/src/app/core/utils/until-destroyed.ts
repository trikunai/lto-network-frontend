import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function untilDestroyed(component: any) {
  const destroy$ = new Subject();
  const orig = component.ngOnDestroy;
  component.ngOnDestroy = function() {
    destroy$.next();
    if (orig) {
      return orig.apply(this, arguments);
    }
  };

  return takeUntil(destroy$);
}
