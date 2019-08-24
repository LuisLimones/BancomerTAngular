import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPopper } from 'angular-popper';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './componentes/login/login.component';
import { MovimientosComponent } from './componentes/movimientos/movimientos.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { InterceptorService } from './servicios/interceptor.service';
import { BancaService } from './servicios/banca.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovimientosComponent,
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    BancaService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

