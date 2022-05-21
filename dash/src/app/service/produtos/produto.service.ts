import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API = '/assets/produtos.json'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Produto[]>(this.API)
    .pipe(
      take(1),
      tap(produtos => console.log())
    );
  }
}
