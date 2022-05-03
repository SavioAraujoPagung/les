import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/LoginModel';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm!:FormGroup; 

  constructor(private formBuilder: FormBuilder, private router: Router, public loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        cpf:['',[Validators.required]],
        senha:['',[Validators.required]]
      }
    );
  }

  submitLogin(){
    var dadosLogin = this.loginForm.getRawValue() as LoginModel;
    console.log(dadosLogin)
    this.loginService.loginUsuario().
    subscribe(
        data => 
        {
          var usuario = data
          debugger
        },
        error => {
          console.log("deu error")
        }
    )
    console.log(dadosLogin)
    this.router.navigate(["/dash"]);

  }


}
