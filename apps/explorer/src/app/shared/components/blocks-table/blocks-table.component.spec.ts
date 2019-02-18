import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material';
import { LtoCommonModule } from '@lto/common';
import { BlocksTableComponent } from './blocks-table.component';

describe('BlocksTableComponent', () => {
  let component: BlocksTableComponent;
  let fixture: ComponentFixture<BlocksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, RouterTestingModule, LtoCommonModule],
      declarations: [BlocksTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
