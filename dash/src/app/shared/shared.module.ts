import { NgModule } from '@angular/core';
import { MATERIAL_IMPORTS } from './material-imports';
import { DialogVendarCafeteriaComponent } from './dialog-vendar-cafeteria/dialog-vendar-cafeteria.component';


@NgModule({
imports: [
  MATERIAL_IMPORTS,
],
exports: [
  MATERIAL_IMPORTS
],
declarations: [
  DialogVendarCafeteriaComponent
],
})
export class SharedModule { }
