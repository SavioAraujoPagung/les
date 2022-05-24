import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API = 'http://localhost:8000/produtos?idUsuario=1'
  //private readonly API = 'https://wqefas.free.beeceptor.com'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Produto[]>(this.API)
    .pipe(
      take(1),
      tap(produtos => console.log())
    );
  }

  criar(produto: Produto) {
    console.log("Realizar query")
    return this.httpClient.post(this.API, produto);
  }
}
