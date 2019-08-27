import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuentahabiente } from '../modelos/cuentahabiente';
import { Movimiento } from '../modelos/movimiento';
import { servidorURL } from '../globales/globales';
import { wsURL } from '../globales/globales';
import Ws from '@adonisjs/websocket-client';

const ws = Ws(wsURL);

@Injectable({
  providedIn: 'root'
})
export class BancaService {

  constructor(private http:HttpClient) { }
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

  checkLogin(): Observable<any>{
    return this.http.get<any>(this.url+'checkLogin', this.httpOptions);
  }

  checkAdmin(): Observable<any>{
    return this.http.get<any>(this.url+'checkAdmin', this.httpOptions);
  }

  //WebSocket
   
  private canal_ca: string;

  conectar(canal_ca: string){
    try {
      this.canal_ca=canal_ca;
      ws.connect();
      const bancaWS = ws.subscribe('banca:'+this.canal_ca);
      bancaWS.on('ready', () => {
        console.log("Conexion del canal existosa "+canal_ca);
      });
      bancaWS.on('close', () => {
        console.log('Conexcion Cerrada '+canal_ca);
      })
    } catch (error) {
      
    }
  }
  cerrarConexion(canal_ca: string){
    try {
      console.log("llega cerrar suscripcion");
      ws.getSubscription('banca:'+canal_ca).close();
    } catch (error) {
      
    }
  }
}


