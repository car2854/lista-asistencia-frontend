import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/materia.model';
import { MateriasService } from '../../services/materias.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from 'src/app/models/estudiante.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.css']
})
export class ListaMateriasComponent implements OnInit {

  public materias!: Materia[];
  public estudiantes!: Estudiante[];
  public tablaEstudiantes!: Estudiante[];

  public idEstudianteSelect: string = '';

  public loading: Boolean = true;
  public loadingMaterias: Boolean = true;
  public loadingEstudiantes: Boolean = true;

  public materiaForm = this.fb.group({
    descripcion   : ['', [Validators.required]],
    nombre        : ['--Seleccione una materia--', [Validators.required]]
  });

  constructor(
    private materiasService: MateriasService,
    private estudianteService: EstudianteService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.materiasService.getMateriasProfesor()
      .subscribe((resp:any) => {
        this.materias = resp.materias;
        
        this.loadingMaterias = false;
        this.loading = this.loadingMaterias || this.loadingEstudiantes;
      }, (err) => {
        console.log(err);
      });

    this.estudianteService.getEstudiantes()
      .subscribe((resp:any) => {
        this.estudiantes = resp.estudiantes;

        this.loadingEstudiantes = false;
        this.loading = this.loadingMaterias || this.loadingEstudiantes;
      }, (err) => {
        console.log(err);
      });
    
      this.tablaEstudiantes = [];
  }

  onChange(valor:any) {
    this.idEstudianteSelect = valor.value;
  }

  public agregar(){
    
    const nuevoEstudiante = this.getEstudiante(this.idEstudianteSelect);
    
    if (nuevoEstudiante!=null && !this.verificarEstudiante(this.idEstudianteSelect)){
      
      this.tablaEstudiantes.push(nuevoEstudiante);
      

    }
    

  }

  public getEstudiante(_id: string) :Estudiante|null {

    for (let estudiante of this.estudiantes){
      
      if (estudiante._id === _id){
        return estudiante;
      }
    }
    return null;
  }

  public verificarEstudiante(_id: string) :boolean {

    for (let estudiante of this.tablaEstudiantes){
      
      if (estudiante._id === _id){
        return true;
      }
    }
    return false;
  }

  public eliminar(estudianteEliminar: Estudiante) {
    this.tablaEstudiantes.forEach((user, index) => {
      if (user._id === estudianteEliminar._id) {
        this.tablaEstudiantes.splice(index,1)
      };
    });
  }

  public guardar(){
    this.materiasService.crearMateria(this.materiaForm.value)
      .subscribe((resp:any) => {
        
        const _id = resp.materia._id;
        this.materias.push(resp.materia);
        
        this.tablaEstudiantes.forEach((estudiante, index) => {

          const data = {
            estudiante  : estudiante._id,
            materia     : _id
          }
          this.estudianteService.inscribirEstudiante(data)
            .subscribe((resp:any) => {
              // console.log(resp);
            }, (err) => {
              console.log(err);
            });

        });
        Swal.fire("Completado", 'Se creo la materia correctamente' , 'success');
        this.materiaForm.reset();
        this.materiaForm.controls['nombre'].setValue('--Seleccione una materia--');
        this.tablaEstudiantes = [];
      }, (err) => {
        Swal.fire("Error", err.error.msg, 'error');
      });
  }

  public verMateria(materia: Materia){
    this.router.navigateByUrl('main/materias');
    // this.router.navigateByUrl(`main/materia/${materia._id}`);
  }

}
