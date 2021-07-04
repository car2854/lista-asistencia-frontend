import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PagesComponent } from './pages.component';
import { ComponentModule } from '../component/component.module';
import { ListaExamenesComponent } from './lista-examenes/lista-examenes.component';
import { ListaMateriasComponent } from './lista-materias/lista-materias.component';
import { VerExamenComponent } from './ver-examen/ver-examen.component';
import { VerMateriaComponent } from './ver-materia/ver-materia.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    ListaExamenesComponent,
    ListaMateriasComponent,
    VerExamenComponent,
    VerMateriaComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentModule
  ],
  exports: [
  ]
})
export class PagesModule { }
