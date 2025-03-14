import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './interceptors/auth.interceptors';  // Ajusta la ruta si es necesario

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Habilita el soporte HTTP en tu aplicación
    RouterModule.forRoot(routes) // Configura las rutas
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptor, // Usa la función directamente
      multi: true // Permite añadir más de un interceptor si es necesario
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
