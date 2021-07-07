import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { EmptyContentComponent } from './empty-content/empty-content.component';



@NgModule({
  declarations: [
    CrearAlumnoComponent,
    LoadingComponent,
    EmptyContentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CrearAlumnoComponent,
    LoadingComponent,
    EmptyContentComponent
  ]
})
export class ComponentModule { }
