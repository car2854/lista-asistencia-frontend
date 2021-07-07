import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MateriasService } from '../../services/materias.service';
import { Examen } from '../../models/examen.model';

@Component({
  selector: 'app-ver-materia',
  templateUrl: './ver-materia.component.html',
  styleUrls: ['./ver-materia.component.css']
})
export class VerMateriaComponent implements OnInit {

  public examenes!: Examen[];
  public loading: Boolean= true;

  constructor(
    private activatedRouter: ActivatedRoute,
    private materiasService: MateriasService
  ) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(({id}) => this.cargarExamenes(id));

  }

  public cargarExamenes(id:string){
    this.materiasService.getExamenesMateria(id)
      .subscribe((resp:any) => {
        
        this.examenes = resp.listaExamenes;
        this.loading = false;        
        
      }, (err) => {
        Swal.fire("Error", err.errrs, 'error');
      })
  }

}
