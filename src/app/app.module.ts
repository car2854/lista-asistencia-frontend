import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { PageEstudianteModule } from './pages-estudiante/page-estudiante.module';
import { ImagenPipe } from './pipe/imagen.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ImagenPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    PageEstudianteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
