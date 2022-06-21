import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Observable, of } from 'rxjs';
import { IVendaCaixa } from 'src/app/interfaces/ICaixa';
import { Cliente } from 'src/app/models/Cliente';
import { Produto } from 'src/app/models/Produto';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { ProdutoService } from 'src/app/service/produtos/produto.service';
import { CaixaDialogComponent } from 'src/app/shared/caixa-dialog/caixa-dialog.component';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  buscarCliente!: FormGroup;
  clientes$!: Observable<Cliente[]>;
  client!: Cliente[];
  clienteAtual!: Cliente;
  displayedColumns = ['cpf', 'nome', 'rfid', 'vender']

  vizualizar: boolean = false;
  
  produtos$!: Observable<Produto[]>;

  prods!: Produto[]
  prodsValorTotal!: number
  displayedColumnss = ['nome', 'rfid', 'preco_venda', 'unidade_medida', 'quantidade']

  constructor(public service: ClienteService, 
              private formBuilder: FormBuilder,
              public dialog: MatDialog){ }

  ngOnInit(): void {
    this.listar();
    this.buscarCliente = this.formBuilder.group(
      {
        rfid:['', []]
      }
    );
  }

  vender(cliente: Cliente) {
    console.log(cliente)
    const dialogRef = this.dialog.open(CaixaDialogComponent, {
      width: '300px',
      height: '300px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result !== undefined ) {
        console.log(result)
      }
    });
  }

  buscarProdutos(cliente: Cliente) {
    this.produtos$ = this.service.buscarProdutosVendas(cliente.id)
    this.produtos$.subscribe(
      (produtos) => {
        if (produtos.length) {
          this.prodsValorTotal = produtos
            .map(produto => produto.preco_venda)
            .reduce((acc, valor) => acc + valor)
        } else {
          this.prodsValorTotal = 0
        }
      }
    )

    this.clienteAtual = cliente;
  }

  buscar() {
    var cliente = this.buscarCliente.getRawValue() as Cliente;
    var rfid: string = cliente.rfid
    this.clientes$.subscribe(
      {
        next: data => {
          this.client = data
        }
      }
    )

    this.clientes$ = this.service.buscarClienteAtivo(rfid)
    .pipe(
      catchError(
        error => {
          this.onError('Produtos não encontrados');
          return of([]);
        })
    )
    console.log("buscar depois : ")
    console.log(this.client)
  }

  listar() {
    this.clientes$ = this.service.clienteAtivos()
    .pipe(
      catchError(
        error => {
          this.onError('Produtos não encontrados');
          return of([]);
        })
    );
    this.clientes$.subscribe(
      {
        next: data => {
          this.client = data
        }
      }
    )
  }
  
  onError(errorMsg: string) {
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
