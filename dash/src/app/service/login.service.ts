import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly baseUrl = environment['endPoint'];

  constructor(private httpClient: HttpClient) { 

  }

  loginUsuario(){
    return this.httpClient.get<Usuario>('/assets/login.json');
  }
}
