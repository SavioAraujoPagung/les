import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/LoginModel';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly baseUrl = environment['endPoint'];
  private readonly api = '/src/assets/login.json';

  constructor(private httpClient: HttpClient) { 

  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  loginUsuario(login:LoginModel){
    const user = this.httpClient.post<Usuario>('/api/users/login', login);
    //this.emitirLoginEfetuado.emit(user);
    return user;
    
  }
}
