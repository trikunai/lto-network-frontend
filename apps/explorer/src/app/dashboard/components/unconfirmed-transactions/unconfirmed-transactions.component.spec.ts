import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '@lto/core/testing';
import { SharedModule } from '../../../shared';

import { UnconfirmedTransactionsComponent } from './unconfirmed-transactions.component';

describe('UnconfirmedTransactionsComponent', () => {
  let component: UnconfirmedTransactionsComponent;
  let fixture: ComponentFixture<UnconfirmedTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule, SharedModule],
      declarations: [UnconfirmedTransactionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnconfirmedTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
