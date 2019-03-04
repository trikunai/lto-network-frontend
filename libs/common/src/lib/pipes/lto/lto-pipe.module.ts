import { NgModule } from '@angular/core';
import { LtoPipe } from './lto.pipe';

@NgModule({
  declarations: [LtoPipe],
  exports: [LtoPipe]
})
export class LtoPipeModule {}
