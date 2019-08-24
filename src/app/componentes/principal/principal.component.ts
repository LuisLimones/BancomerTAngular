import { Component, OnInit } from '@angular/core';
import { BancaService } from '../../servicios/banca.service';
import { Cuentahabiente } from '../../modelos/cuentahabiente'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private bs: BancaService) { }

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

  ngOnInit() {
    this.getCuentahabiente();
  }

  getCuentahabiente(){
    this.bs.getActual().subscribe(data => this.cuentahabiente = data);
  }

}
