import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../services/examen.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Examen } from '../../models/examen.model';
import { Estudiante } from 'src/app/models/estudiante.model';
import { MateriasService } from '../../services/materias.service';

import { Columns, PdfMakeWrapper, Table } from 'pdfmake-wrapper';

@Component({
  selector: 'app-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.css']
})
export class VerExamenComponent implements OnInit {

  public examen!: Examen;

  public loading: Boolean = true;

  private listaEstudiantes: Estudiante[] = [];
  private listaEstudiantesMateria: Estudiante[] = [];

  public estudiantes: Estudiante[] = [];
  public filterStatus: string = "Estudiantes que ingresaron al examen"

  constructor(
    private examenService: ExamenService,
    private activatedRoute: ActivatedRoute,
    private materiasService: MateriasService
  ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(({id}) => this.cargarExamen(id));
    this.activatedRoute.params.subscribe(({id}) => this.cargarListaEstudiante(id));

  }

  public cargarExamen(id:string){
    
    this.examenService.getExamen(id)
     .subscribe((resp:any) => {
      this.examen = resp.examen;
      
      this.materiasService.getEstudiantesMateria(this.examen.materia._id)
        .subscribe((resp:any) => {

          resp.listaEstudiantes.forEach((estudiante:any, index:number) => {
            this.listaEstudiantesMateria.push(estudiante.estudiante);
          });
          
        }, (err) => {
          Swal.fire("Error", "Error al cargar los estudiantes de la materia", 'error');
        })

      this.loading = false;
     }, (err) => {
      Swal.fire("Error", err.errrs, 'error');
     })
    
  }

  public cargarListaEstudiante(id:string){
    this.examenService.getEstudiantesExamen(id)
      .subscribe((resp:any) => {

        resp.listaEstudiantes.forEach((estudiante:any,index:number) => {
          
          // console.log(estudiante);
          this.listaEstudiantes.push(estudiante.estudiante);
          this.estudiantes.push(estudiante.estudiante);
        });

        console.log(this.estudiantes);
        

      }, (err) => {
        console.log(err);
        
      })
  }

  public verEstudiantesExamen(){
    this.filterStatus = "Estudiantes que ingresaron al examen"
    this.estudiantes = this.listaEstudiantes;
  }

  public verEstudiantesNoExamen(){
    this.filterStatus = "Estudiantes que no ingresaron al examen"
    this.cargarEstudiantesNoExamen();
  }


  public cargarEstudiantesNoExamen(){

    let newArray: Estudiante[] = [];
    this.listaEstudiantesMateria.forEach((estudiante1:any,index1:number) => {
      
      let status = false;

      this.listaEstudiantes.forEach((estudiante2:any,index2:number) => {
        
        if (estudiante1._id === estudiante2._id) status = true;

      });

      if (!status){
        newArray.push(estudiante1);
      }

    });

    this.estudiantes = newArray;

  }

  public generarPDF(){
    const pdf = new PdfMakeWrapper();

    pdf.add(this.filterStatus);

    
    



    pdf.create().download();
  }


}
