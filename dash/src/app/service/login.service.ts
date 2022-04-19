import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly baseUrl = environment['endPoint'];

  constructor(private httpClient: HttpClient) { 

  }

  loginUsuario(obj: any){
    return this.httpClient.post<any>
      (`${this.baseUrl}/users/login`, obj);
  }

}
