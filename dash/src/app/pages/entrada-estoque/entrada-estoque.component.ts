import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produtos/produto.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-entrada-estoque',
  templateUrl: './entrada-estoque.component.html',
  styleUrls: ['./entrada-estoque.component.css']
})
export class EntradaEstoqueComponent implements OnInit {
  entradaForm!: FormGroup;
  produtos$!: Observable<Produto[]>;
  displayedColumns = ['id', 'nome', 'rfid', 'preco_venda', 'unidade_medida', 'quantidade']

  constructor(private formBuilder: FormBuilder,
              private service: ProdutoService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.entradaForm = this.formBuilder.group(
      {
        codigo_barras:['',[Validators.required]]
      }
    );
  }

  list(){
    this.produtos$ = this.service.list()
      .pipe(
      catchError(error => {
          this.onError('Produtos não encontrados');
          return of([]);
        })
      )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  entrar(){
    var produto = this.entradaForm.getRawValue() as Produto;
    this.produtos$ = this.service.adicionar(produto);
    this.entradaForm.reset();
  }

}
