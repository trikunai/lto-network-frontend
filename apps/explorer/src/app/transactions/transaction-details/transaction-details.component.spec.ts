import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { CoreTestingModule } from '@lto/core/testing';
import * as ApiMocks from '@lto/core/testing/mocks/api.mock';
import { SharedModule } from '../../shared';

import { TransactionDetailsComponent } from './transaction-details.component';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { LtoPublicNodeService, Transaction } from '@lto/core';

// test_text
const BASE58 = '2Uw1bpuzCCLnF';
const BASE64 = 'dGVzdF90ZXh0';
const HEX = '746573745f74657874';

describe('TransactionDetailsComponent', () => {
  let component: TransactionDetailsComponent;
  let fixture: ComponentFixture<TransactionDetailsComponent>;
  let publicNode: LtoPublicNodeService;
  let activatedRoute: Partial<ActivatedRoute>;

  let routerParamsMock: any;
  let queryParamsMock: any;
  let transactionMock: Transaction;

  beforeEach(async(() => {
    routerParamsMock = {
      transactionId: 'fake_transaction'
    };

    queryParamsMock = {};

    transactionMock = Transaction.fromJSON(
      ApiMocks.transaction({
        id: 'fake_transaction',
        anchors: [BASE58]
      })
    );

    activatedRoute = {
      params: of(routerParamsMock),
      queryParams: of(queryParamsMock)
    };

    TestBed.configureTestingModule({
      imports: [CoreTestingModule, SharedModule, RouterTestingModule],
      declarations: [TransactionDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ]
    }).compileComponents();

    publicNode = TestBed.get(LtoPublicNodeService);
    publicNode.transaction = () => of(transactionMock);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hash check', () => {
    it('Should validate hash in HEX encoding', async () => {
      queryParamsMock.hash = HEX;
      const receipt = await component.receipt$.pipe(take(1)).toPromise();
      expect(receipt.valid).toBe(true);
    });

    it('Should validate hash in base58 encoding', async () => {
      queryParamsMock.hash = BASE58;
      const receipt = await component.receipt$.pipe(take(1)).toPromise();
      expect(receipt.valid).toBe(true);
    });

    it('Should validate hash in base64 encoding', async () => {
      queryParamsMock.hash = BASE64;
      const receipt = await component.receipt$.pipe(take(1)).toPromise();
      expect(receipt.valid).toBe(true);
    });

    it('should detect if hash invalid', async () => {
      queryParamsMock.hash = 'invalid_value';
      const receipt = await component.receipt$.pipe(take(1)).toPromise();
      expect(receipt.valid).toBe(false);
    });
  });
});
