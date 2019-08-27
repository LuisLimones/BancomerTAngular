import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BancaService } from './servicios/banca.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BancomerT';
  navbar=localStorage.getItem('navbar');
  constructor(private router:Router, private bs: BancaService){
  
  }
  logout(){
    localStorage.removeItem('token');
    console.log(localStorage.getItem('ca'));
    this.bs.cerrarConexion(localStorage.getItem('ca'));
    localStorage.removeItem('ca');
    localStorage.removeItem('navbar');
    this.router.navigate(['/']);
  }
}
