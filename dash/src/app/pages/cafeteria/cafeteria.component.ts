import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produtos/produto.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-cafeteria',
  templateUrl: './cafeteria.component.html',
  styleUrls: ['./cafeteria.component.css']
})
export class CafeteriaComponent implements OnInit {

  produtos$!: Observable<Produto[]>;
  id!: string;
  displayedColumns = ['id', 'nome', 'rfid', 'preco_venda', 'unidade_medida', 'quantidade', 'vender']
  

  constructor(private service: ProdutoService,
              public dialog: MatDialog){ }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.produtos$ = this.service.list()
      .pipe(
      catchError(error => {
          this.onError('Produtos não encontrados');
          return of([]);
        })
      )
    console.log(this.produtos$)
  }

  vender(produto: Produto) {
    console.log(produto)
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: produto
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result !== undefined ) {
        console.log(result)
      }
    });
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
