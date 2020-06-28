import { HttpErrorResponse } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

export function requestFulfilled(
  loading$: Observable<boolean>,
  error$: Observable<HttpErrorResponse>,
): Observable<any> {
  return combineLatest([error$, loading$]).pipe(
    filter(([, adding]) => !adding),
    first(),
    filter(([error]) => !error),
  );
}
