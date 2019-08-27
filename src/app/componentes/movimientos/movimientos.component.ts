import { Component, OnInit } from '@angular/core';
import { BancaService } from '../../servicios/banca.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movimiento } from '../../modelos/movimiento';
import { Cuentahabiente } from '../../modelos/cuentahabiente'

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  constructor(private bs: BancaService, private router: Router, private toastr: ToastrService) { }

  movimientos: Movimiento[];
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
    this.getMovimientos();
  }

  getMovimientos(){
    this.bs.getMovimientos().subscribe(data => {
      if(data != null){
        this.movimientos=data;
        this.movimientos.forEach(element => {
          if(element.created_at.length>=10){
            element.created_at=element.created_at.substring(0, 10);
          }
        });
      }
      else{
        this.toastr.error('No Tiene Movimientos','',{ timeOut:5000});
      }
    });
  }
  getCuentahabiente(){
    this.bs.getActual().subscribe(data => this.cuentahabiente = data);
  }
}
