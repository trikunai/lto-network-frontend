import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveTextComponent } from './responsive-text.component';

describe('ResponsiveTextComponent', () => {
  let component: ResponsiveTextComponent;
  let fixture: ComponentFixture<ResponsiveTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
