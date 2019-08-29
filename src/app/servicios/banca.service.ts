import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cuentahabiente } from '../modelos/cuentahabiente';
import { Movimiento } from '../modelos/movimiento';
import { servidorURL } from '../globales/globales';
import { wsURL } from '../globales/globales';
import Ws from '@adonisjs/websocket-client';
import { ToastrService } from 'ngx-toastr';

const ws = Ws(wsURL);

@Injectable({
  providedIn: 'root'
})
export class BancaService {

  private movimientos = new BehaviorSubject([]);
  movimientosActuales = this.movimientos.asObservable();

  constructor(private http:HttpClient, private toastr: ToastrService) { }
  url:string = servidorURL;
  httpOptions={
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };


  //Cliente-Servidor
  postRegistrar(ca: Cuentahabiente): Observable<Cuentahabiente>{
    return this.http.post<Cuentahabiente>(this.url+'registrar', ca, this.httpOptions);
  }

  login(data): Observable<any>{
    return this.http.post<any>(this.url+'login', data, this.httpOptions);
  }

  postPagos(data): Observable<any>{
    return this.http.post<any>(this.url+'pagos', data, this.httpOptions);
  }

  getActual(): Observable<Cuentahabiente>{
    return this.http.get<Cuentahabiente>(this.url+'actual', this.httpOptions);
  }

  getMovimientos(): Observable<any>{
    return this.http.get<any>(this.url+'movimientos', this.httpOptions);
  }

  actulizarMovimientos(movimientos){
    this.movimientos.next(movimientos);
  }

  checkLogin(): Observable<any>{
    return this.http.get<any>(this.url+'checkLogin', this.httpOptions);
  }

  checkAdmin(): Observable<any>{
    return this.http.get<any>(this.url+'checkAdmin', this.httpOptions);
  }

  //WebSocket
  conectar(canal_ca: string){
    try {
      ws.connect();
      const bancaWS = ws.subscribe('banca:'+canal_ca);
      bancaWS.on('ready', () => {
        console.log("Conexion del canal existosa "+canal_ca);
      });
      bancaWS.on('close', () => {
        console.log('Conexion Cerrada '+canal_ca);
      });
      bancaWS.on('movimientos', (movimientos) =>{
        console.log('Llega onMovimientos Socket')
        this.actulizarMovimientos(movimientos);
        this.toastr.success('Recibiste Un Pago O Transferencia');
      });
      bancaWS.on('actualizar', (movimientos) => {
      })
    } catch (error) {
      
    }
  }

  cerrarConexion(canal_ca: string){
    try {
      console.log("llega cerrar suscripcion");
      ws.getSubscription('banca:'+canal_ca).close();
    } catch (error) {
      console.log(error);
    }
  }

  getSocket(canal_ca): Ws{
    try {
      return ws.getSubscription('banca:'+canal_ca);
    } catch (error) {
      console.log(error)
    }
  }

  wsNotificacion(canal_ca, data){
    try {
      ws.getSubscription('banca:'+canal_ca).emit('notificacion', data);
      console.log("Notifica");
    } catch (error) {
      console.log(error)
    }
  }

  wsMovimientos(canal_ca, movimientos){
    try {
      ws.getSubscription('banca:'+canal_ca).emit('actualizar', movimientos);
    } catch (error) {
      console.log(error)
    }
  }
  pruebaToastr(){
    console.log("Llega prueba toastr");
    this.toastr.success('Funciona', '', {timeOut: 2000});
  }
}


