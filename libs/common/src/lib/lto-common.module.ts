import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { ContentSectionComponent } from './components/content-section/content-section.component';
import { HttpErrorComponent } from './components/http-error/http-error.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ResponsiveTextComponent } from './components/responsive-text/responsive-text.component';
import { LtoPipe } from './pipes/lto.pipe';

const commonComponents = [
  ContentSectionComponent,
  HttpErrorComponent,
  LoadingSpinnerComponent,
  ResponsiveTextComponent
];
const commonPipes = [LtoPipe];

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [...commonComponents, ...commonPipes],
  exports: [...commonComponents, ...commonPipes]
})
export class LtoCommonModule {}
