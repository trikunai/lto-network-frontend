import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ImportAccountComponent } from './import-account.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared';
import { PasswordFormFieldModule } from '../components/password-form-field/password-form-field.module';
import { LocalAccountsService, AuthService } from '../../core';
import { LtoService } from '@lto/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('auth/ImportAccountComponent', () => {
  let component: ImportAccountComponent;
  let fixture: ComponentFixture<ImportAccountComponent>;
  let localAccounts: LocalAccountsService;
  let authService: AuthService;
  let ltoService: LtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, PasswordFormFieldModule, NoopAnimationsModule],
      declarations: [ImportAccountComponent],
      providers: [
        {
          provide: LocalAccountsService,
          useValue: {
            availableAccounts$: of([])
          } as Partial<LocalAccountsService>
        },
        {
          provide: AuthService,
          useValue: {} as Partial<AuthService>
        },
        {
          provide: LtoService,
          useValue: {} as Partial<LtoService>
        },
        {
          provide: Router,
          useValue: {}
        }
      ]
    }).compileComponents();

    localAccounts = TestBed.get(LocalAccountsService);
    authService = TestBed.get(AuthService);
    ltoService = TestBed.get(LtoService);

    fixture = TestBed.createComponent(ImportAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should disable Login button if no local accounts presented', () => {
    const loginLink = fixture.debugElement.query(By.css('.login-link'));
    expect(loginLink.attributes.disabled).toBe('true');
  });
});
