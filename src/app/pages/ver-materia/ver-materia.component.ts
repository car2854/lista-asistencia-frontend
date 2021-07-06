import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MateriasService } from '../../services/materias.service';
import { Materia } from '../../models/materia.model';
import { Estudiante } from 'src/app/models/estudiante.model';

@Component({
  selector: 'app-ver-materia',
  templateUrl: './ver-materia.component.html',
  styleUrls: ['./ver-materia.component.css']
})
export class VerMateriaComponent implements OnInit {

  public materia!: Materia;
  public estudiantes!: Estudiante[];

  public loading: Boolean = true;

  constructor(
    private materiasService: MateriasService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(({id}) => this.cargarMateria(id));

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

}
