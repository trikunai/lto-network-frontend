import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LocalAccountsService, LocalUserAccount } from '../core';
import { LoginGuard } from './login.guard';
import { of } from 'rxjs';

describe('auth/LoginGuard', () => {
  let guard: LoginGuard;
  let localAccounts: LocalAccountsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          } as Partial<Router>
        },
        { provide: LocalAccountsService, useValue: {} as Partial<LocalAccountsService> }
      ]
    });

    guard = TestBed.get(LoginGuard);
    router = TestBed.get(Router);
    localAccounts = TestBed.get(LocalAccountsService);
  });

  describe('#canActivate', () => {
    it('should not allow to activate if no local accounts', async () => {
      localAccounts.availableAccounts$ = of([]);
      const canActivate = await guard.canActivate().toPromise();
      expect(canActivate).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/', 'auth', 'create']);
    });

    it('should allow to activate if local accounts exist', async () => {
      localAccounts.availableAccounts$ = of([
        LocalUserAccount.fromJSON({
          accountName: 'TestAccount'
        })
      ]);
      const canActivate = await guard.canActivate().toPromise();
      expect(canActivate).toBe(true);
    });
  });
});
