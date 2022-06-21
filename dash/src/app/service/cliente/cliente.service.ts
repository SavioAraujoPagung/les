import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { IVendaCaixa } from 'src/app/interfaces/ICaixa';
import { Cliente } from 'src/app/models/Cliente';
import { Produto } from 'src/app/models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly API = 'http://localhost:8000/cliente'
  constructor(private httpClient: HttpClient) { }

  buscar(cliente: Cliente) {
    return this.httpClient.get<Cliente[]>(this.API + "/" + cliente.cpf + "?idUsuario=1")
      .pipe(
        take(1),
        tap(produtos => console.log())
      );
  }

  buscarClienteAtivo(rfid: string): Observable<Cliente[]>{
    if (rfid == "") {
      return this.clienteAtivos();
    } else {
      var url: string = "http://localhost:8000/cliente-ativo/" + rfid
      return this.httpClient.get<Cliente[]>(url + "?idUsuario=1")
      .pipe(
        take(1),
        tap(produtos => console.log())
      );
    }
  }

  adicionar(cliente: Cliente){
    return this.httpClient.post(this.API + "?idUsuario=1", cliente)
  }

  entrar(cpf: string) {
    var url: string
    url = this.API + "/entrada" + "?idUsuario=1&cpf=" + cpf
    return this.httpClient.post(url , null)
  }

  clienteAtivos(): Observable<Cliente[]>{
    var url: string = "http://localhost:8000/clientes-ativos"
    return this.httpClient.get<Cliente[]>(url + "?idUsuario=1").pipe(
      take(1),
    )
  }

  buscarProdutosVendas(id: number): Observable<Produto[]>{
    var url: string = `http://localhost:8000/cliente-vendas/${id}?idUsuario=1`
    return this.httpClient.get<Produto[]>(url).pipe(
      take(1),
    )
  }
}


