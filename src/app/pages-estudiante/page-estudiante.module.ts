import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageEstudianteRoutingModule } from './page-estudiante-routing.module';
import { PageEstudianteComponent } from './page-estudiante.component';
import { ListaMateriasComponent } from './lista-materias/lista-materias.component';
import { VerMateriaComponent } from './ver-materia/ver-materia.component';
import { ComponentModule } from '../component/component.module';
import { VerExamenComponent } from './ver-examen/ver-examen.component';
import { AcceptComponent } from './status-examen-cam/accept.component';
import { NoAcceptComponent } from './status-examen-cam/no-accept.component';


@NgModule({
  declarations: [
    PageEstudianteComponent,
    ListaMateriasComponent,
    VerMateriaComponent,
    VerExamenComponent,
    AcceptComponent,
    NoAcceptComponent
  ],
  imports: [
    CommonModule,
    PageEstudianteRoutingModule,
    ComponentModule
  ]
})
export class PageEstudianteModule { }
