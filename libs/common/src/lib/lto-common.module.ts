import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { ContentSectionComponent } from './components/content-section/content-section.component';
import { HttpErrorComponent } from './components/http-error/http-error.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

const commonComponents = [ContentSectionComponent, HttpErrorComponent, LoadingSpinnerComponent];

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [...commonComponents],
  exports: [...commonComponents]
})
export class LtoCommonModule {}
