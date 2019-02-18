import { async, TestBed } from '@angular/core/testing';
import { LtoCommonModule } from './lto-common.module';

describe('LtoCommonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LtoCommonModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LtoCommonModule).toBeDefined();
  });
});
