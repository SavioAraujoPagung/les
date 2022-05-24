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

@NgModule({
  declarations: [
    AppComponent,
    CadastroUsuarioComponent,
    DashboardComponent,
    MenuLateralComponent,
    LoginComponent,
    BuscarProdutoComponent,
    CadastroProdutoComponent,
    CafeteriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
