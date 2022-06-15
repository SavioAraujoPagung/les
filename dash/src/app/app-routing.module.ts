import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarProdutoComponent } from './pages/buscar-produto/buscar-produto.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CafeteriaComponent } from './pages/cafeteria/cafeteria.component';
import { CaixaComponent } from './pages/caixa/caixa.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EntradaEstoqueComponent } from './pages/entrada-estoque/entrada-estoque.component';
import { FiscalEntradaComponent } from './pages/fiscal-entrada/fiscal-entrada.component';
import { FiscalSaidaComponent } from './pages/fiscal-saida/fiscal-saida.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', pathMatch: 'full' ,redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'buscar-produtos', component: BuscarProdutoComponent },
  { path: 'cadastrar-usuario', component:  CadastroUsuarioComponent },
  { path: 'cadastrar-produtos', component:  CadastroProdutoComponent },
  { path: 'entrada-estoque', component:  EntradaEstoqueComponent },
  { path: 'cafeteria', component:  CafeteriaComponent },
  { path: 'fiscal-entrada', component:  FiscalEntradaComponent },
  { path: 'fiscal-saida', component:  FiscalSaidaComponent },
  { path: 'caixa', component:  CaixaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
