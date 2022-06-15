import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormDialog, IProdutoVenda, IVenda } from 'src/app/interfaces/IVenda';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produtos/produto.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})

export class ElementDialogComponent implements OnInit {
  venderForm!: FormGroup;

  venda: IVenda = {
    finalizado: false,
    produtos: [
      {
        idProduto: 0,
        quantidade: 0,
        preco: 0
      }
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private service: ProdutoService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
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
    if (this.data.quantidade < cliente.qtd) {
      return
    }

    this.venda.finalizado = false;
    this.venda.produtos[0].quantidade = cliente.qtd
    this.venda.produtos[0].idProduto = this.data.id
    this.venda.produtos[0].preco = this.data.preco_venda
    
    this.service.vender(cliente.rfid, this.venda).subscribe(
      resultado => {
        console.log(resultado)
        this.success("Produto vendido com sucesso!")
      },
      err => {
        this.onError("ERRO ao vender produtos!")
      }
    );  
    this.data.quantidade -= cliente.qtd
    this.dialogRef.close();  
  }

  onError (errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  success(successMsg: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: successMsg
    })
  }
}
