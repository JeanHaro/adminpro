import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';
// Modulos
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

/* Componentes */
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    // Habilita al angular en general todas las rutas que exportamos de acá
    AppRoutingModule,
    // Modulo de páginas - con sus componentes
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
