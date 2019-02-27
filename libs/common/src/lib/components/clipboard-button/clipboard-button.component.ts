import { Component, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lto-clipboard-button',
  templateUrl: './clipboard-button.component.html',
  styleUrls: ['./clipboard-button.component.scss']
})
export class ClipboardButtonComponent {
  @Input() text!: string;
  @Input() message = 'Copied to clipboard';

  get isSupported(): boolean {
    return this._document.queryCommandSupported('copy');
  }

  constructor(private _snackbar: MatSnackBar, @Inject(DOCUMENT) private _document: Document) {}

  copyToClipboard() {
    if (this.isSupported !== true) {
      this._snackbar.open('Your browser does not support this feature', 'Dismiss', {
        duration: 3000
      });
      return;
    }

    const input = this._document.createElement('input');
    input.style.position = 'absolute';
    input.style.bottom = '-1000px';
    this._document.body.appendChild(input);
    input.value = this.text;
    input.select();
    this._document.execCommand('copy');
    this._document.body.removeChild(input);

    this._snackbar.open(this.message, 'Dismiss', { duration: 3000 });
  }
}
