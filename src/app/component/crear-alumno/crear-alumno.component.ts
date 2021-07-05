import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent implements OnInit {

  @ViewChild('closeButton') closeModal!: ElementRef;

  public estudianteForm = this.fb.group({
    email   : ['', [Validators.required]],
    nombre  : ['', [Validators.required]],  
    ci      : ['', [Validators.required]],
    foto1   : ['asd', [Validators.required]],
    foto2   : ['asd', [Validators.required]],
    foto3   : ['asd', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
  }

  guardar(){
    this.estudianteService.crearEstudiante(this.estudianteForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        this.closeModal.nativeElement.click();
      }, (err) => {
        Swal.fire("Error", err.error.msg, 'error');
      })
  }

}
