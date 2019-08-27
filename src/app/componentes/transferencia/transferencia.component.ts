import { Component, OnInit, OnDestroy } from '@angular/core';
import { BancaService } from '../../servicios/banca.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit, OnDestroy {

  constructor(private bs: BancaService, private router: Router, private toastr: ToastrService) { }

  datos= {
    tipo: "Pago",
    receptor: '',
    concepto: '',
    cantidad: ''
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.bs.cerrarConexion(localStorage.getItem('ca2'));
  }

  submitPagos(){
    this.bs.postPagos(this.datos).subscribe(data => {
      if(data.id != null){
        this.toastr.success('TransaccionExitosa', '',{
          timeOut: 5000
        });
        localStorage.setItem('ca2', this.datos.receptor);
        this.bs.conectar(localStorage.getItem('ca2'));
        this.datos = {
          tipo: "Pago",
          receptor: '',
          concepto: '',
          cantidad: ''
        }
      }
      else{
        this.toastr.error('Ocurrio Un Error', '', { timeOut: 5000});
      }
    });
  }

}
