import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-fiscal-entrada',
  templateUrl: './fiscal-entrada.component.html',
  styleUrls: ['./fiscal-entrada.component.css']
})
export class FiscalEntradaComponent implements OnInit {

  criarCliente!: FormGroup;
  buscarCliente!: FormGroup;
  clientes$!: Observable<Cliente[]>;
  displayedColumns = ['cpf', 'nome', 'rfid', 'entrar']
  cpf!: string;


  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              public service: ClienteService) {}

  ngOnInit(): void {
    this.criarCliente = this.formBuilder.group(
      { 
        nome:['', [Validators.required]],
        cpf:['', [Validators.required]],
        rfid:['', [Validators.required]]
      }
    );

    this.buscarCliente = this.formBuilder.group(
      {
        cpf:['', [Validators.required]]
      }
    )
  }

  criar(){
    var cliente = this.criarCliente.getRawValue() as Cliente;
    this.service.adicionar(cliente).subscribe(
      resultado => {
        console.log(resultado)
        this.success("Cadastrado com SUCESSO!")
      },
      err => {
        this.onError("ERRO ao cadastrar cliente!")
      }
    );
    this.criarCliente.reset();
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

  buscar(){
    var cliente = this.buscarCliente.getRawValue() as Cliente;
    this.cpf = cliente.cpf
    this.clientes$ = this.service.buscar(cliente)
  }

  entrar(){
    debugger
    this.service.entrar(this.cpf).subscribe(
      resultado => {
        console.log(resultado)
        this.success("Entrada bem sucedida!")
      },
      err => {
        this.onError("ERRO ao dar entrada em cliente!\n Erro: " + err)
      }
    )
  }

}
