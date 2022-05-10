import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produtos/produto.service';

@Component({
  selector: 'app-buscar-produto',
  templateUrl: './buscar-produto.component.html',
  styleUrls: ['./buscar-produto.component.css']
})
export class BuscarProdutoComponent implements OnInit {
  produtos$: Observable<Produto[]>;
  displayedColumns = ['nome', 'categoria', 'rfid', 'preco_venda', 'unidade_medida', 'quantidade']
  rfid = 'Clear me';
  constructor(
    private produtoService: ProdutoService,
    public dialog: MatDialog
    ) {
    this.produtos$ = this.produtoService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar EndPoint');
        return of([]);
      })
    )
  }

  onError(errorMsg: string) {
    // this.dialog.open(ErrorDialogComponent, {
    //   data: errorMsg
    // });
  }

  ngOnInit(): void {
  }

}
