import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { EmptyContentComponent } from './empty-content/empty-content.component';
import { VideoPlayerComponent } from './video-player/video-player.component';



@NgModule({
  declarations: [
    CrearAlumnoComponent,
    LoadingComponent,
    EmptyContentComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CrearAlumnoComponent,
    LoadingComponent,
    EmptyContentComponent,
    VideoPlayerComponent
  ]
})
export class ComponentModule { }
