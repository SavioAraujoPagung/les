import { NgModule } from '@angular/core';
import { MATERIAL_IMPORTS } from './material-imports';
import { ElementDialogComponent } from './element-dialog/element-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    MATERIAL_IMPORTS,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MATERIAL_IMPORTS,
  ],
  declarations: [
  
    ElementDialogComponent
  ],
})
export class SharedModule { }
