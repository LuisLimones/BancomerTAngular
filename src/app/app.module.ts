import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPopper } from 'angular-popper';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './componentes/login/login.component';
import { MovimientosComponent } from './componentes/movimientos/movimientos.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovimientosComponent,
    PagosComponent,
    PrincipalComponent,
    TransferenciaComponent,
    RegistrarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPopper,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

