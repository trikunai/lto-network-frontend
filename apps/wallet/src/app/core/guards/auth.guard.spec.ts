import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { AuthGuard } from './auth.guard';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authMock: Partial<AuthService>;
  let routerMock: Partial<Router>;
  let guard: AuthGuard;

  beforeEach(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            authenticated$: of(false)
          }
        },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.get(AuthGuard);
    authMock = TestBed.get(AuthService);
  });

  it('should redirect to /auth if not logged in', async () => {
    const canActivate = await guard.canActivate(null as any, null as any).toPromise();
    expect(canActivate).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/', 'auth']);
  });

  it('should let you pass when authenticated', async () => {
    authMock.authenticated$ = of(true);
    const canActivate = await guard.canActivate(null as any, null as any).toPromise();
    expect(canActivate).toBe(true);
  });
});
