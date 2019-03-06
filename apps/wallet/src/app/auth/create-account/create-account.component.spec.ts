import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared';
import { PasswordFormFieldModule } from '../components/password-form-field/password-form-field.module';
import { LocalAccountsService, AuthService } from '../../core';
import { LtoService, LTO_NETWORK_BYTE } from '@lto/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CreateAccountComponent } from './create-account.component';

describe('auth/CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let localAccounts: LocalAccountsService;
  let authService: AuthService;
  let ltoService: LtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, PasswordFormFieldModule, NoopAnimationsModule],
      declarations: [CreateAccountComponent],
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
          provide: Router,
          useValue: {}
        },
        LtoService.provider,
        {
          provide: LTO_NETWORK_BYTE,
          useValue: 'T'
        }
      ]
    }).compileComponents();

    localAccounts = TestBed.get(LocalAccountsService);
    authService = TestBed.get(AuthService);
    ltoService = TestBed.get(LtoService);

    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should disable Login button if no local accounts presented', () => {
    const loginLink = fixture.debugElement.query(By.css('.login-link'));
    expect(loginLink.attributes.disabled).toBe('true');
  });
});
