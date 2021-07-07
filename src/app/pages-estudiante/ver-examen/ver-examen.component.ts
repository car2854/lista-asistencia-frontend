import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/models/examen.model';
import { ExamenService } from '../../services/examen.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.css']
})
export class VerExamenComponent implements OnInit {

  public examen!: Examen;
  public loading: Boolean = true;

  constructor(
    private examenService: ExamenService,
    private activatedRouter: ActivatedRoute,
    private profesorService: ProfesorService
  ) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(({id}) => this.cargarExamen(id));


  }

  public cargarExamen(id:string){
    this.examenService.getExamen(id)
      .subscribe((resp:any) => {
        this.examen = resp.examen;

        this.profesorService.getProfesor(this.examen.profesor)
          .subscribe((resp:any) => {
            this.examen.profesor = resp.profesor.nombre;
            this.loading = false;
            console.log(this.examen);
            
          },(err) => {
            Swal.fire("Error", err.errrs, 'error');
          })

        
      }, (err) => {
        Swal.fire("Error", err.errrs, 'error');
      })
  }

}
