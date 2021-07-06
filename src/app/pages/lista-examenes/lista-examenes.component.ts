import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/models/examen.model';
import { Materia } from 'src/app/models/materia.model';
import Swal from 'sweetalert2';
import { ExamenService } from '../../services/examen.service';
import { MateriasService } from '../../services/materias.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExamenForm } from '../../interfaces/crearExamen.form';

@Component({
  selector: 'app-lista-examenes',
  templateUrl: './lista-examenes.component.html',
  styleUrls: ['./lista-examenes.component.css']
})
export class ListaExamenesComponent implements OnInit {

  public examenForm = this.fb.group({
    descripcion   : ['', [Validators.required]],
    materia       : ['', [Validators.required]],
    titulo        : ['', [Validators.required]]
  });

  public examenes!: Examen[];
  public materias!: Materia[];


  public loading: Boolean = true;
  private loadingExamenes: Boolean = true;
  private loadingMaterias: Boolean = true;

  constructor(
    private examenService: ExamenService,
    private materiasService: MateriasService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.examenService.getExamenes()
      .subscribe((resp:any) => {
        this.examenes = resp.listaExamenes;

        this.loadingExamenes = false;
        this.loading = this.loadingExamenes || this.loadingMaterias;

      },(err) => {
        Swal.fire("Error", err.error.msg, 'error');
      })

    this.materiasService.getMateriasProfesor()
    .subscribe((resp:any) => {
      this.materias = resp.materias;
      
      this.loadingMaterias = false;
      this.loading = this.loadingExamenes || this.loadingMaterias;
    },(err) => {
      Swal.fire("Error", err.error.msg, 'error');

    });

  }

  public guardar(){
    const data = {
      descripcion : this.examenForm.value.descripcion,
      id          : this.examenForm.value.materia,
      titulo      : this.examenForm.value.titulo
    }
    this.examenService.crearExamen(data)
      .subscribe((resp:any) => {
        this.examenService.getExamen(resp.examen._id)
          .subscribe((resp:any) => {
            this.examenes.push(resp.examen);
            this.examenForm.reset();
          }, (err) => {
            console.log(err);
            
            Swal.fire("Error", 'No se pudo obtener el nuevo examen', 'error');
          })
      }, (err) => {
        Swal.fire("Error", 'No se pudo crear el examen', 'error');
      })
  }

}
