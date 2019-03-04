import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveTextComponent } from './responsive-text.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ResponsiveTextComponent],
  exports: [ResponsiveTextComponent]
})
export class ResponsiveTextModule {}
