import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MovimientosComponent } from './componentes/movimientos/movimientos.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';



const routes: Routes = [
  {path: 'registrar', component: RegistrarComponent },
  {path: '**', redirectTo: "" }
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
