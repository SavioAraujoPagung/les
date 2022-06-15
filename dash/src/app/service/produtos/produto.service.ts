import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IVenda } from 'src/app/interfaces/IVenda';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API = 'http://localhost:8000/produtos/'
  private readonly USUARIO = '?idUsuario=1'
  private readonly API_CAFETERIA = 'http://localhost:8000/produtos?idUsuario=1&categoria=1'
  
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Produto[]>(this.API_CAFETERIA)
    .pipe(
      take(1),
      tap(produtos => console.log())
    );
  }

  adicionar(produto: Produto) {
    var api = this.API + produto.codigo_barras + this.USUARIO
    return this.httpClient.put<Produto[]>(api, null)
    .pipe(
      take(1),
      tap(produtos => console.log())
    );
  }

  criar(produto: Produto) {
    return this.httpClient.post(this.API + this.USUARIO, produto);
  }

  vender(rfid: string, venda: IVenda) {
    let url  = this.API + "vender" + this.USUARIO + "&rfid=" + rfid
    debugger
    return this.httpClient.post(url, venda)
  }
}
