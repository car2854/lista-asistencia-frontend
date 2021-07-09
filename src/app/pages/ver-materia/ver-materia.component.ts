import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MateriasService } from '../../services/materias.service';
import { Materia } from '../../models/materia.model';
import { Estudiante } from 'src/app/models/estudiante.model';
import { EstudianteService } from '../../services/estudiante.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ver-materia',
  templateUrl: './ver-materia.component.html',
  styleUrls: ['./ver-materia.component.css']
})
export class VerMateriaComponent implements OnInit {

  public formEstudiante = this.fb.group({
    estudiante: ['', [Validators.required]]
  });

  public materia!: Materia;
  public estudiantes!: Estudiante[];
  public listaEstudiantes!: Estudiante[];

  public loading: Boolean = true;
  public sendForm:boolean = false;

  constructor(
    private materiasService: MateriasService,
    private activatedRouter: ActivatedRoute,
    private estudianteService: EstudianteService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(({id}) => this.cargarMateria(id));

    this.cargarListaDeEstudiantes();
  }

  public cargarListaDeEstudiantes(){
    this.estudianteService.getEstudiantes()
      .subscribe((resp:any) => {
        this.listaEstudiantes = resp.estudiantes;
        console.log(this.listaEstudiantes);
      }, (err) => {
        console.log('No se puede obtener la lista de los estudiantes a agregar');
        
      })
  }

  public cargarMateria(id:String){

    this.estudiantes = [];

    this.materiasService.getMateria(id)
      .subscribe((resp:any) => {
        this.materia = resp.materiaDB;

        this.materiasService.getEstudiantesMateria(id)
          .subscribe((resp:any) => {
            resp.listaEstudiantes.forEach((resp:any) => {
              this.estudiantes.push(resp.estudiante);
            });
            this.loading = false;
          },(err) => {
            Swal.fire("Error", 'Error al cargar los estudiantes', 'error');
          })

      },(err) => {
        console.log(err);
        Swal.fire("Error", 'Error al cargar los datos de la materia', 'error');
      })

  }

  public agregar(){

    console.log(this.formEstudiante.value);
    

    if(!this.sendForm && this.formEstudiante.invalid){      
      return;
    }

    if (this.existeEstudiante()){
      return;
    }

    this.sendForm = true;

    
    this.activatedRouter.params.subscribe(({id}) => this.addEstudiante(id));
    
  }

  public existeEstudiante():boolean{

    let existe: boolean = false;

    this.estudiantes.forEach(estudiante => {
      if (estudiante._id === this.formEstudiante.value.estudiante){
        existe = true;
      }
    });
    return existe;

  }

  public addEstudiante(id:string){

    const data = {
      estudiante: this.formEstudiante.value.estudiante,
      materia: id
    }

    this.estudianteService.inscribirEstudiante(data)
      .subscribe((resp:any) => {
        this.estudiantes.push(resp.estudianteDB);
        this.formEstudiante.controls['estudiante'].setValue('');
      }, (err) => {
        console.log(err);
        Swal.fire("Error", err.error.msg, 'error');
      })
    console.log('Enviar');
    

  }

  public delete(_id: string){
    this.activatedRouter.params.subscribe(({id}) => this.eliminarEstudiante(id, _id));
  }

  public eliminarEstudiante(materia:string, id: string){
    this.estudianteService.uninscribirEstudiante(id,materia)
      .subscribe((resp:any)=>{
        // this.formEstudiante.controls['estudiante'].setValue('');
        this.eliminarEstudianteTabla(resp.inscripcion.estudiante);
      }, (err) => {
        console.log(err);
        
        Swal.fire("Error", 'No se puso eliminar', 'error');
      })
  }

  public eliminarEstudianteTabla(id: string){
    this.estudiantes.forEach((estudiante, index) => {
      if (estudiante._id === id){
        this.estudiantes.splice(index,1);
      }
    });
  }

}
