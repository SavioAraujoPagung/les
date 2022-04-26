import { Component, OnInit } from '@angular/core';
//import {TabMenuModule} from 'primeng/tabmenu';
//import { MenuItem } from '@material-ui/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(){
    this.items = [
      {label: 'Administrador', icon: 'pi pi-fw pi-home', routerLink: ['/']},
      {label: 'Caixa', icon: 'pi pi-fw pi-calendar'},
      {label: 'Fiscal Entrada', icon: 'pi pi-fw pi-pencil'},
      {label: 'Fiscal Saída', icon: 'pi pi-fw pi-file'},
      {label: 'Cafeteria', icon: 'pi pi-fw pi-calendar'},
      {label: 'Estoque', icon: 'pi pi-fw pi-calendar'}
    ];
  }

}
