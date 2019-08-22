import { Component, OnInit } from '@angular/core';
import { Cuentahabiente } from '../../modelos/cuentahabiente';
import { BancaService } from '../../servicios/banca.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private servicio: BancaService, private router: Router,
    private toastr: ToastrService) { }

  cuentahabiente: Cuentahabiente={
    id: null,
    tarjeta: null,
    password: null,
    tipo: null,
    nombre: null,
    calle: null,
    colonia: null,
    numero: null,
    fondos: null
  };

  ngOnInit() {
  }

  submitRegistrar(){
    this.servicio.postRegistrar(this.cuentahabiente).subscribe(data=>{
      if(data.tarjeta!=null){
        this.toastr.success('Su Numero De Cuenta Es '+data.tarjeta, '', {
          timeOut: 10000
        });
      }
    });
  }

}
