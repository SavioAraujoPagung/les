import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalancaService {
  private readonly baseUrl = environment.balancaUrl;
  //private readonly api = '/src/assets/login.json';

  constructor(private httpClient: HttpClient) { 

  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPesoBalanca(): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl)
  }
}
