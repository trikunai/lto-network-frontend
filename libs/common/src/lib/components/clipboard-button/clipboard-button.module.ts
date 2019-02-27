import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material'
import { ClipboardButtonComponent } from './clipboard-button.component';

@NgModule({
  declarations: [ClipboardButtonComponent],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [ClipboardButtonComponent]
})
export class ClipboardButtonModule { }
