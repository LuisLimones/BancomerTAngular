import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BancaService } from '../servicios/banca.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private bs: BancaService, private router: Router){}

  condicion = 'true';

  canActivate(): boolean{
    
    this.bs.checkAdmin().subscribe(data => {
      console.log(data);
      this.condicion = data;
      console.log(this.condicion);
    });

    console.log("Condicion", this.condicion);

    if(this.condicion=='true'){
      console.log("llega true")
      return true;
    }
    else{
      console.log("llega false")
      this.router.navigate(['/principal']);
    }
  }
}
