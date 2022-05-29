import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/LoginModel';
import { Usuario } from 'src/app/models/Usuario';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm!:FormGroup; 

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        cpf:['',[Validators.required]],
        senha:['',[Validators.required]]
      }
    );

    // this.loginService.emitirLoginEfetuado.subscribe(
    //   login => console.log("aiaiaiia" + login)
    // )
  }

  submitLogin(){
    var dadosLogin: LoginModel;
    var usuario: Usuario;
    dadosLogin = this.loginForm.getRawValue() as LoginModel;
    this.loginService.loginUsuario(dadosLogin).
    subscribe({
        next: data => 
        {
          usuario = data
          //debugger
          if (dadosLogin.cpf == usuario.cpf && dadosLogin.senha == usuario.senha){
            // this.storage.setItem("usuario",usuario.funcionalidades[0].nome)
            let id_funcs = usuario.funcionalidadeList.map(item => item.id) 
            this.router.navigate(["/dash"], {queryParams:id_funcs});
            return
          }
        },
        error: error => {
          console.log("deu error")
        }
      })
    //console.log(dadosLogin)
    // if (dadosLogin.cpf != usuario.cpf){
    //   this.router.navigate(["/dash"]);
    // }

  }

  buscarProdutos(){
    this.router.navigate(["/buscar-produto"])
  }


}
