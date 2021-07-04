import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PageEstudianteRoutingModule } from './pages-estudiante/page-estudiante-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [

  // path 'auth' AuthRouting
  // path 'main' PagesRouting
  // path 'main-estudiante' MainEstudianteRouting

  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
    PageEstudianteRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
