import { Component, OnInit } from '@angular/core';
import { BancaService } from '../../servicios/banca.service';
import { Cuentahabiente } from '../../modelos/cuentahabiente'
import Ws from '@adonisjs/websocket-client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private bs: BancaService, private toastr: ToastrService) { }

  cuentahabiente:Cuentahabiente ={
    id: 0,
    tarjeta: '',
    password: '',
    tipo: '',
    nombre: '',
    calle: '',
    colonia: '',
    numero: '',
    fondos: 0
  };

  async ngOnInit() {
    this.getCuentahabiente();
    this.bs.conectar(localStorage.getItem('ca'));
  }

  getCuentahabiente(){
    this.bs.getActual().subscribe(data => {
      console.log(data);
      this.cuentahabiente = data;
    });
  }

  

}
