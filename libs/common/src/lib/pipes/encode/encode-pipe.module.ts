import { NgModule } from '@angular/core';
import { EncodePipe } from './encode.pipe';

@NgModule({
  declarations: [EncodePipe],
  exports: [EncodePipe]
})
export class EncodePipeModule {}
