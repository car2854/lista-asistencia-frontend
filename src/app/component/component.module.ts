import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CrearAlumnoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CrearAlumnoComponent
  ]
})
export class ComponentModule { }
