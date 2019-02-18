import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContentTableComponent } from './card-content-table.component';

describe('CardContentTableComponent', () => {
  let component: CardContentTableComponent;
  let fixture: ComponentFixture<CardContentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardContentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
