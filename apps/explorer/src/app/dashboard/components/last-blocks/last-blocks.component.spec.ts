import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '@lto/core/testing';
import { SharedModule } from '../../../shared';

import { LastBlocksComponent } from './last-blocks.component';

describe('LastBlocksComponent', () => {
  let component: LastBlocksComponent;
  let fixture: ComponentFixture<LastBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule, SharedModule],
      declarations: [LastBlocksComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
