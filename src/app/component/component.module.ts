import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    CrearAlumnoComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CrearAlumnoComponent,
    LoadingComponent
  ]
})
export class ComponentModule { }
