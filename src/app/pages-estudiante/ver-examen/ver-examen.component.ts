import { Component, OnInit, ElementRef, ViewChild, ViewChildren, OnDestroy } from '@angular/core';
import { Examen } from 'src/app/models/examen.model';
import { ExamenService } from '../../services/examen.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.css']
})
export class VerExamenComponent implements OnInit, OnDestroy {
  @ViewChild('cam') cam!: ElementRef;


  public examen!: string;
  public loading: Boolean = true;
  public dimensionesCamara: any;

  public currentStream: any;

  constructor(
    private examenService: ExamenService,
    private activatedRouter: ActivatedRoute,
    private profesorService: ProfesorService
  ) { }


  ngOnDestroy(): void {
    // localStorage.setItem('recargar','true');
    window.location.reload();
  }

  ngOnInit(): void {
    
    this.activatedRouter.params.subscribe(({id}) => this.examen = id);
    this.checkMediaSource();
    console.log(this.examen);
    
  }


  
  // public cargarExamen(id:string){
  //   this.examenService.getExamen(id)
  //     .subscribe((resp:any) => {

  //       console.log(resp);
  //       console.log(id);


  //       this.examen = resp.examen;

  //       this.profesorService.getProfesor(this.examen.profesor)
  //         .subscribe((resp:any) => {
  //           this.examen.profesor = resp.profesor.nombre;
  //           this.loading = false;
  //           console.log(this.examen);
            
  //           this.checkMediaSource();
  //           this.getSizeCam();
  //         },(err) => {
  //           Swal.fire("Error", err.errrs, 'error');
  //         })

        
  //     }, (err) => {
  //       Swal.fire("Error", err.errrs, 'error');
  //     })
  // }



  checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {
      
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream;        
      }).catch(() => {
        console.log('**** ERROR NOT PERMISSIONS *****');
      });

    } else {
      console.log('******* ERROR NOT FOUND MEDIA DEVICES');
    }
  };

}
