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
  async ngOnDestroy(){
    this.bs.cerrarConexion(localStorage.getItem('ca2'));
    console.log('Llega onDestroy');
    localStorage.removeItem('ca2');
  }

  async submitPagos(){
    if(this.datos.receptor != localStorage.getItem('ca')){
      this.bs.postPagos(this.datos).subscribe(data => {
        if(data){
          this.toastr.success('TransaccionExitosa', '',{
            timeOut: 2000
          });
          localStorage.setItem('ca2', this.datos.receptor);
          this.datos = {
            tipo: "Pago",
            receptor: '',
            concepto: '',
            cantidad: ''
          }
          this.bs.conectar(localStorage.getItem('ca2'));
          this.bs.wsMovimientos(localStorage.getItem('ca2'),data);
          this.bs.wsNotificacion(localStorage.getItem('ca2'), data);
          this.bs.cerrarConexion(localStorage.getItem('ca2'));
        }
        else{
          this.toastr.error('Ocurrio Un Error', '', { timeOut: 5000});
        }
      });
    }
    else{
      this.datos.receptor=='';
      this.toastr.error('No puedes trasnferirte a ti mismo', '', {
        timeOut: 2000
      })
    }
  }

}
