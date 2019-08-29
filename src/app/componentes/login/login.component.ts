import { Component, OnInit } from '@angular/core';
import { BancaService } from '../../servicios/banca.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private bs: BancaService, private router: Router, private toastr: ToastrService) { }

  datos={
    tarjeta: '',
    password: ''
  }
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/principal']);
    }
  }

  logearte(){
    this.bs.login(this.datos).subscribe(data=>{
      let token=data.token;
      if(token != null){
        localStorage.setItem('token', token);
        localStorage.setItem('navbar', "true");
        localStorage.setItem('ca', this.datos.tarjeta);
        this.toastr.success('Bienvenido', '', {
          timeOut: 5000
        })
        this.router.navigate(['/principal']);
      }
      else{
        this.toastr.error('Usuario O Contraseña Invalidos');
        this.datos={
          tarjeta: '',
          password: ''
        }
      }
    });
  }
}
