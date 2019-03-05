import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { HttpErrorComponent } from './components/http-error/http-error.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

const commonComponents = [HttpErrorComponent, LoadingSpinnerComponent];

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [...commonComponents],
  exports: [...commonComponents]
})
export class LtoCommonModule {}
