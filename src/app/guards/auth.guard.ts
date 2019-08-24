import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BancaService } from '../servicios/banca.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private bs: BancaService, private router: Router){}

  condicion = 'false';

  canActivate():boolean{
    this.bs.checkLogin().subscribe(data => {
      this.condicion=data.respuesta;
    });
    if(localStorage.getItem('token')){
      if(this.condicion){
        return true;
      }
      else{
        localStorage.removeItem('token');
        alert('Error De Autenticacion\nVuelva A Iniciar Sesion');
        this.router.navigate(['/login']);
      }
    }
    else{
      alert('Por Favor Inicie Sesion');
      this.router.navigate(['/login']);
    }
  }
}
