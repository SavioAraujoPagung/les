import { Component, OnInit } from '@angular/core';
import { CheckboxRequiredValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';

export const permissoes = [
  {
    id:1,
    nome:"Administrador",
    checked:false
  },
  {
    id:2,
    nome:"Caixa",
    checked:false
  },
  {
    id:3,
    nome:"Estoque",
    checked:false
  },
  {
    id:4,
    nome:"Cafeteria",
    checked:false
  },
  {
    id:5,
    nome:"Fiscal Entrada",
    checked:false
  },
  {
    id:6,
    nome:"Fiscal Saida",
    checked:false
  },
]
@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})


export class CadastroUsuarioComponent implements OnInit {
  usuarioForm!:FormGroup;
  listaCheckbox = permissoes
  constructor(private formBuilder: FormBuilder, private router: Router, public usuarioService : UsuarioService) { }

  salvarUsuario(){
    var dadosUsuario : Usuario
    dadosUsuario = this.usuarioForm.getRawValue() as Usuario;
    dadosUsuario.funcionalidadeList = this.permissoesSelecionadas()
    console.log(dadosUsuario)
    // this.usuarioService.saveUsuario(dadosUsuario).
    // subscribe({
    //     next: data => 
    //     {
    //       console.log(data)
    //     },
    //     error: error => {
    //       console.log("deu error")
    //     }
    //   })
  }

  permissoesSelecionadas(){
    return this.listaCheckbox.filter(permissao => permissao.checked).map(
      permissaoChecked => {
        return {
          id:permissaoChecked.id,
          nome:permissaoChecked.nome,
        }
      }
    )
  }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group(
      {
        nome:['',[Validators.required]],
        senha:['',[Validators.required]],
        cpf:['',[Validators.required]],
        datacriacao:['',[Validators.required]],
      }
    );
  }
  
}
