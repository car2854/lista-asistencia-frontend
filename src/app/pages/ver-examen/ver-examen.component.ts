import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../services/examen.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Examen } from '../../models/examen.model';

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => this.cargarExamen(id));

  }

  public cargarExamen(id:string){
    
    this.examenService.getExamen(id)
     .subscribe((resp:any) => {
      this.examen = resp.examen;
      this.loading = false;
     }, (err) => {
      Swal.fire("Error", err.errrs, 'error');
     })
    
  }

}
