import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageEstudianteRoutingModule } from './page-estudiante-routing.module';
import { PageEstudianteComponent } from './page-estudiante.component';
import { ListaMateriasComponent } from './lista-materias/lista-materias.component';
import { VerMateriaComponent } from './ver-materia/ver-materia.component';


@NgModule({
  declarations: [
    PageEstudianteComponent,
    ListaMateriasComponent,
    VerMateriaComponent
  ],
  imports: [
    CommonModule,
    PageEstudianteRoutingModule,
  ]
})
export class PageEstudianteModule { }
