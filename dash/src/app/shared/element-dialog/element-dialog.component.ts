import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormDialog, IProdutoVenda, IVenda } from 'src/app/interfaces/IVenda';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produtos/produto.service';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})

export class ElementDialogComponent implements OnInit {
  venderForm!: FormGroup;

  venda!: IVenda;
  prod!: IProdutoVenda;

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private service: ProdutoService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.venderForm = this.formBuilder.group(
      {
        qtd:['', [Validators.required]],
        rfid:['', [Validators.required]]
      }
    );
  }

  cancelar() {
    this.dialogRef.close();
  }

  vender() {
    var cliente = this.venderForm.getRawValue() as FormDialog;

    debugger
    this.venda.finalizado = false;
    this.prod.id = this.data.id
    
        
    this.venda.produtos.push()
    this.service
  }
}
