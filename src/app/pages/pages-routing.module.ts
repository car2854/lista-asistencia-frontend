import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ListaExamenesComponent } from './lista-examenes/lista-examenes.component';
import { ListaMateriasComponent } from './lista-materias/lista-materias.component';
import { VerExamenComponent } from './ver-examen/ver-examen.component';
import { VerMateriaComponent } from './ver-materia/ver-materia.component';
import { GuardProfesorGuard } from '../guard/guard-profesor.guard';

const routes: Routes = [
  {
    path: 'main',
    component: PagesComponent,
    canActivate: [GuardProfesorGuard],
    canLoad: [GuardProfesorGuard],
    children: [
      { path: 'examenes', component: ListaExamenesComponent },
      { path: 'examen/:id', component: VerExamenComponent },
      { path: 'materias', component: ListaMateriasComponent },
      { path: 'materias/:id', component: VerMateriaComponent },
      { path: '', redirectTo: '/main/materias', pathMatch: 'full'},
      { path: '**', redirectTo: '/main/materias' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
