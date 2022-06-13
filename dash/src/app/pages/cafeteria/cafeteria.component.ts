import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produtos/produto.service';
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
              public dialog: MatDialog,
              private router: Router){ }

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

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  vender() {
    debugger
    this.router.navigate(["/caixa"])
  }

}
