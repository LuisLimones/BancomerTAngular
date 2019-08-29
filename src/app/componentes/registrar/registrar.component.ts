import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cuentahabiente } from '../../modelos/cuentahabiente';
import { BancaService } from '../../servicios/banca.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit, OnDestroy {

  constructor(private bs: BancaService, private router: Router,
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

  async ngOnInit() {
    await this.bs.conectar(localStorage.getItem('ca'));
  }
  async ngOnDestroy(){
    await this.bs.cerrarConexion(localStorage.getItem('ca'));
  }

  submitRegistrar(){
    this.bs.postRegistrar(this.cuentahabiente).subscribe(data=>{
      if(data.tarjeta!=null){
        this.toastr.success('Su Numero De Cuenta Es '+data.tarjeta, '', {
          timeOut: 10000
        });
      }
    });
  }

}
