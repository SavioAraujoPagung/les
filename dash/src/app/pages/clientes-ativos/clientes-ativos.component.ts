import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-clientes-ativos',
  templateUrl: './clientes-ativos.component.html',
  styleUrls: ['./clientes-ativos.component.css']
})
export class ClientesAtivosComponent implements OnInit {

  buscarCliente!: FormGroup;
  clientes$!: Observable<Cliente[]>;
  client!: Cliente[];
  displayedColumns = ['cpf', 'nome', 'rfid', 'entrar']

  constructor(public service: ClienteService, 
              private formBuilder: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listar();
    this.buscarCliente = this.formBuilder.group(
      {
        rfid:['', []]
      }
    );
  }

  vender(){
    
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
