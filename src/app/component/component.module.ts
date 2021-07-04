import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';



@NgModule({
  declarations: [
    CrearAlumnoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CrearAlumnoComponent
  ]
})
export class ComponentModule { }
