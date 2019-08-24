import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuentahabiente } from '../modelos/cuentahabiente';
import { Movimiento } from '../modelos/movimiento';
import { servidorURL } from '../globales/globales';

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
}


