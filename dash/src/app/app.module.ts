import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuLateralComponent } from './pages/menu-lateral/menu-lateral.component';
import { BuscarProdutoComponent } from './pages/buscar-produto/buscar-produto.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { CafeteriaComponent } from './pages/cafeteria/cafeteria.component';
import { FiscalEntradaComponent } from './pages/fiscal-entrada/fiscal-entrada.component';
import { FiscalSaidaComponent } from './pages/fiscal-saida/fiscal-saida.component';
import { CaixaComponent } from './pages/caixa/caixa.component';
import { EntradaEstoqueComponent } from './pages/entrada-estoque/entrada-estoque.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClientesAtivosComponent } from './pages/clientes-ativos/clientes-ativos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CadastroUsuarioComponent,
    DashboardComponent,
    MenuLateralComponent,
    LoginComponent,
    BuscarProdutoComponent,
    CadastroProdutoComponent,
    CafeteriaComponent,
    FiscalEntradaComponent,
    FiscalSaidaComponent,
    CaixaComponent,
    EntradaEstoqueComponent,
    ClientesAtivosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
