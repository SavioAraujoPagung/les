import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';

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

  adicionar(cliente: Cliente){
    return this.httpClient.post(this.API + "?idUsuario=1", cliente)
  }

  entrar(cpf: string) {
    var url: string
    url = this.API + "/entrada" + "?idUsuario=1&cpf="+ cpf
    debugger
    return this.httpClient.post(url , null)
  }
}


