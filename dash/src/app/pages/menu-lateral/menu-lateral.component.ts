import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) { }

  ngOnInit(): void{
    
  }

  caixa(): void {

  }

  fiscalSaida(): void {

  }
  fiscalEntrada(): void {

  }

  funcionarioCafeteria(): void {

  }
  entradaEstoque(): void {
    this.router.navigate(["/cadastrar-produtos"])
  }
  administrador(): void {
    this.router.navigate(["/cadastrar-usuario"])
  }
}
