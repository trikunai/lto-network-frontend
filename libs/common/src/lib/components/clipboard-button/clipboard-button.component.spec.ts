import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatButtonModule, MatSnackBar, MatSnackBarModule } from '@angular/material';

import { ClipboardButtonComponent } from './clipboard-button.component';

describe('ClipboardButtonComponent', () => {
  let component: ClipboardButtonComponent;
  let fixture: ComponentFixture<ClipboardButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatButtonModule, MatSnackBarModule, NoopAnimationsModule],

      declarations: [ClipboardButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipboardButtonComponent);
    component = fixture.componentInstance;
    component.text = 'test_text';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy provided text to clipboard', inject([DOCUMENT], (document: Document) => {
    spyOn(document, 'execCommand');
    component.copyToClipboard();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  }));

  it('should show notification if browser does not support "execCommand"', inject(
    [DOCUMENT, MatSnackBar],
    (document: Document, snackbar: MatSnackBar) => {
      document.queryCommandSupported = () => false;
      spyOn(document, 'execCommand');
      spyOn(snackbar, 'open');
      component.copyToClipboard();
      expect(snackbar.open).toHaveBeenCalled();
      expect(document.execCommand).not.toHaveBeenCalled();
    }
  ));
});
