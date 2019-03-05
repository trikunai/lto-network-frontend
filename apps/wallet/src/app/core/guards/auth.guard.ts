import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._auth.authenticated$.pipe(
      take(1),
      map(account => !!account),
      tap(authenticated => {
        if (!authenticated) {
          this._router.navigate(['/', 'auth']);
        }
      })
    );
  }
}
