import { Component, OnInit } from '@angular/core';
import { CheckboxRequiredValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  usuarioForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, public usuarioService : UsuarioService) { }

  salvarUsuario(){
    var dadosUsuario : Usuario
    dadosUsuario = this.usuarioForm.getRawValue() as Usuario;

    console.log(dadosUsuario);
  }
  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group(
      {
        nome:['',[Validators.required]],
        senha:['',[Validators.required]],
        cpf:['',[Validators.required]],
        datacriacao:['',[Validators.required]],
        funcionalidades: [""]
      }
    );
  }
  
}
