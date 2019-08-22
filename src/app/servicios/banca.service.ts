import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuentahabiente } from '../modelos/cuentahabiente';
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
}
