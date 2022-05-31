import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
//import {TabMenuModule} from 'primeng/tabmenu';
//import { MenuItem } from '@material-ui/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  
  categorias: string[] = ['Caixa', 'Fiscal Saída', 'Fiscal Entrada', 'Cliente', 'Funcionario Cafeteria', 'Entrada de Estoque', 'Administrador'];
  categoria: string = "Adm";

  @Input() public id_funcs = []
  
  constructor(private router: Router) { 
    this.id_funcs = []
  }

  definirVisibilidade(number : Number){
    return this.id_funcs.find(item => item == number)
  }

  ngOnInit(): void{
    console.log(this.id_funcs)
  }

  caixa(): void {
    this.router.navigate(["/caixa"])
  }

  fiscalSaida(): void {
    this.router.navigate(["/fiscal-saida"])

  }

  fiscalEntrada(): void {
    this.router.navigate(["/fiscal-entrada"])
  }

  funcionarioCafeteria(): void {
    this.router.navigate(["/cafeteria"])
  }
  
  cadastrarProdutos(): void {
    this.router.navigate(["/cadastrar-produtos"])
  }

  entradaEstoque(): void {
    this.router.navigate(["/entrada-estoque"])
  }

  administrador(): void {
    this.router.navigate(["/cadastrar-usuario"])
  }
}
