import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarProdutoComponent } from './pages/buscar-produto/buscar-produto.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CafeteriaComponent } from './pages/cafeteria/cafeteria.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path:'', pathMatch: 'full' ,redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'buscar-produtos', component: BuscarProdutoComponent },
  { path: 'cadastrar-usuario', component:  CadastroUsuarioComponent },
  { path: 'cadastrar-produtos', component:  CadastroProdutoComponent },
  { path: 'cafeteria', component:  CafeteriaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
