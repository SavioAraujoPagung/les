import { NgModule } from '@angular/core';
import { MATERIAL_IMPORTS } from './material-imports';


@NgModule({
  imports: [
    MATERIAL_IMPORTS,
  ],
  exports: [
    MATERIAL_IMPORTS,
  ],
  declarations: [
  ],
})
export class SharedModule { }
