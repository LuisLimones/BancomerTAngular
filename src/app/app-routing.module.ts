import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MovimientosComponent } from './componentes/movimientos/movimientos.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';



const routes: Routes = [
  {path: 'principal', component: PrincipalComponent, canActivate:[AuthGuard]},
  {path: 'registrar', component: RegistrarComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'pagos', component: TransferenciaComponent, canActivate:[AuthGuard]},
  {path: 'movimientos', component: MovimientosComponent, canActivate:[AuthGuard]},
  {path: '', component: LoginComponent },
  {path: '**', redirectTo: "" }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
