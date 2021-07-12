import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.urlSocket, options: {} }

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { PageEstudianteModule } from './pages-estudiante/page-estudiante.module';
import { ImagenPipe } from './pipe/imagen.pipe';
import { environment } from '../environments/environment.prod';

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
    PageEstudianteModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
