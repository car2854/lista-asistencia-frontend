import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { PageEstudianteComponent } from './page-estudiante.component';
import { ListaMateriasComponent } from './lista-materias/lista-materias.component';
import { VerMateriaComponent } from './ver-materia/ver-materia.component';
import { GuardEstudianteGuard } from '../guard/guard-estudiante.guard';
import { VerExamenComponent } from './ver-examen/ver-examen.component';
import { AcceptComponent } from './status-examen-cam/accept.component';
import { NoAcceptComponent } from './status-examen-cam/no-accept.component';

const routes: Routes = [
  {
    path: 'main-estudiante',
    component: PageEstudianteComponent,
    canActivate: [GuardEstudianteGuard],
    canLoad: [GuardEstudianteGuard],
    children: [
      {path: 'materias', component: ListaMateriasComponent},
      {path: 'materias/:id', component: VerMateriaComponent},
      {path: 'examen/no-accept', component: NoAcceptComponent},
      {path: 'examen/accept', component: AcceptComponent},
      {path: 'examen/:id', component: VerExamenComponent},
      {path: '', redirectTo: '/main-estudiante/materias', pathMatch: 'full'},
      {path: '**', redirectTo: '/main-estudiante/materias' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageEstudianteRoutingModule { }
