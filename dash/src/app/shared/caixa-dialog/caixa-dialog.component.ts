import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormDialog, IProdutoVenda, IVenda } from 'src/app/interfaces/IVenda';
import { Cliente } from 'src/app/models/Cliente';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produtos/produto.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-caixa-dialog',
  templateUrl: './caixa-dialog.component.html',
  styleUrls: ['./caixa-dialog.component.css']
})

export class CaixaDialogComponent implements OnInit {
  venderForm!: FormGroup;

  venda: IVenda = {
    finalizado: false,
    produtos: [
      {
        idProduto: 0,
        rfidProduto: "",
        quantidade: 0,
        preco: 0
      }
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<CaixaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    private service: ProdutoService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.venderForm = this.formBuilder.group(
      {
        rfid:['', [Validators.required]],
        qtd:['1', [Validators.required]]
      }
    );
  }

  cancelar() {
    this.dialogRef.close();
  }
  vender() {
    var produto = this.venderForm.getRawValue() as FormDialog;
    
    this.venda.finalizado = false;
    this.venda.produtos[0].quantidade = produto.qtd;
    this.venda.produtos[0].rfidProduto = produto.rfid;
    this.venda.produtos[0].idProduto = 0;
    this.venda.produtos[0].preco = 0;
    debugger
    this.service.vender(this.data.rfid , this.venda).subscribe(
      resultado => {
        console.log(resultado)
        this.success("Produto vendido com sucesso!")
      },
      err => {
        this.onError("ERRO ao vender produtos!")
      }
    );

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
