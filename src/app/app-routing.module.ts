import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';



const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'login', component:LoginComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
