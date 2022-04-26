import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'', pathMatch: 'full' ,redirectTo: 'login'},
  
  {
    path: 'login', component: LoginComponent
    //loadChildren: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  { path: 'dash', component: DashboardComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
