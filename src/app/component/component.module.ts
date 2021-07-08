import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { EmptyContentComponent } from './empty-content/empty-content.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CrearAlumnoComponent,
    LoadingComponent,
    EmptyContentComponent,
    VideoPlayerComponent,
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CrearAlumnoComponent,
    LoadingComponent,
    EmptyContentComponent,
    VideoPlayerComponent,
    BackButtonComponent
  ]
})
export class ComponentModule { }
