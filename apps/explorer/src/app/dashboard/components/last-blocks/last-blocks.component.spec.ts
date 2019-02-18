import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestingModule } from '@app/_testing';
import { MatTableModule } from '@angular/material';

import { LastBlocksComponent } from './last-blocks.component';

describe('LastBlocksComponent', () => {
  let component: LastBlocksComponent;
  let fixture: ComponentFixture<LastBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule, MatTableModule],
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
