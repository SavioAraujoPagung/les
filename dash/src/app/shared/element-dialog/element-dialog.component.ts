import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVenda } from 'src/app/interfaces/IVenda';
import { Produto } from 'src/app/models/Produto';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    
  ){}

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  vender() {

  }
}
