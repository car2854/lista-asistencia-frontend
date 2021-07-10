import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/models/examen.model';
import Swal from 'sweetalert2';
import { ExamenService } from '../../services/examen.service';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit {

  private _id!: string;
  public examen!: Examen;

  public loagind: boolean = true;

  constructor(
    private examenService: ExamenService,
    private estudiante: EstudianteService
  ) {
    
  }

  ngOnInit(): void {

    // this.recargar();

    if (localStorage.getItem('_id')){
      this._id = localStorage.getItem('_id') || '';      
      this.cargarDatos();
    }else{
      console.log('No se encontro la id del examen');
    }

    // localStorage.removeItem('_id');
    

  }

  public recargar(){

    if (localStorage.getItem('recargar')){
      window.location.reload();
    }

  }

  public cargarDatos(){

    this.examenService.getExamen(this._id)
      .subscribe((resp:any) => {

        
        this.examen = resp.examen;
        
        this.estudiante.getIngreso(resp.examen._id)
          .subscribe((resp:any) => {
            
            if (resp.ingresoDB.length == 0){
              console.log('No ingreso a la reunion');
              this.estudiante.ingresarExamen(this.examen._id)
                .subscribe((resp:any) => {

                  console.log(resp);
                  
                  
                }, (err) => {
                  Swal.fire("Error", 'Error al guardar registro en la base de datos', 'error');
                })
              }
            this.loagind = false;

          }, (err) => {
            Swal.fire("Error", 'Error al cargar los datos', 'error');
          })


      }, (err) => {
        Swal.fire("Error", err.errrs, 'error');
      })

  }

}
