import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/materia.model';
import Swal from 'sweetalert2';
import { MateriasService } from '../../services/materias.service';
import { ProfesorService } from '../../services/profesor.service';
import { Profesor } from '../../models/profesor.model';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.css']
})
export class ListaMateriasComponent implements OnInit {

  public materias: Materia[] = [];
  public profesores :Profesor[] = [];

  public loading: Boolean = true;

  constructor(
    private materiasService: MateriasService,
    private profesorService: ProfesorService
  ) { }

  ngOnInit(): void {

    this.materiasService.getMateriasEstudiante()
      .subscribe((resp:any) => {
        resp.materiasDB.forEach((resp:any) => {
          
          if (resp.materia != null){
            this.materias.push(resp.materia)
          }
        });
        
        this.cargarProfesores();
      }, (err) => {
        Swal.fire("Error", err.errrs, 'error');
      })
      

  }

  public cargarProfesores(){
    this.profesorService.getProfesores()
    .subscribe((resp:any) => {
      this.profesores = resp.profesores;

      this.materias.forEach((materia,index) => {
        
        if (this.buscarProfesor(materia.profesor) != "$no$existe"){
          
          this.materias[index].profesor = this.buscarProfesor(materia.profesor);
        };

      });
      this.loading = false;      
    }, (err) => {
      Swal.fire("Error", err.errrs, 'error');
    })
  }


  public buscarProfesor(id: string):string{

    let nombre: string= "$no$existe";

    this.profesores.forEach((profesor) => {
      
      if (profesor._id == id) nombre = profesor.nombre;
    })

    return nombre;
  }

}
