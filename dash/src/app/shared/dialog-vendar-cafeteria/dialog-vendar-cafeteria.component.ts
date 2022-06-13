import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from 'src/app/models/Produto';

@Component({
  selector: 'app-dialog-vendar-cafeteria',
  templateUrl: './dialog-vendar-cafeteria.component.html',
  styleUrls: ['./dialog-vendar-cafeteria.component.css']
})
export class DialogVendarCafeteriaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogVendarCafeteriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
