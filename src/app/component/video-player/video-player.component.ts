import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { FaceApiService } from '../../services/face-api.service';
import { VideoPlayService } from '../../services/video-play.service';
import { Estudiante } from '../../models/estudiante.model';
import { EstudianteService } from '../../services/estudiante.service';
import { Examen } from '../../models/examen.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('videoElement') videoElement!: ElementRef;
  @Input() stream:any;
  @Input() width!: number;
  @Input() height!: number;
  @Input() examen!: string;

  public modelsReady: boolean = false;

  public listEvents:Array<any> = [];

  public overCanvas: any;

  public estudiante!: Estudiante;

  private imagenesCargadas: boolean = false;

  private countEvent: number = 0;
  private countFaceAcept: number = 0;
  private cantFaceAcept: number = 3;

  public errorDetection:boolean = false;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private faceApiService: FaceApiService,
    private videoPlayService: VideoPlayService,
    private estudianteService: EstudianteService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.estudiante = this.estudianteService.estudiante;
    this.listenerEvent();
    // console.log(this.examen._id);
    
  }
  
  ngOnDestroy(): void {
    this.listEvents.forEach(event => event.unsubscribe());
    this.videoElement.nativeElement.pause();
  }

  public listenerEvent = () => {
    const observer1$ = this.faceApiService.cbModels.subscribe(res => {
      // TODO: Los modelos estan listo
      if (!this.imagenesCargadas){
        this.videoPlayService.cargarImagenes();
        this.imagenesCargadas = true;
      }

      this.modelsReady = true;
      this.checkFace();
    })

    const observer2$ = this.videoPlayService.cbAi
      .subscribe( ({results1, results2, results3, resizedDetections, displaySize, results}) => {

        this.validarRegistro(results);

        resizedDetections = resizedDetections[0] || null;
        

        if (resizedDetections){
          this.drawFace(resizedDetections, displaySize);
        }
      });

    this.listEvents = [observer1$, observer2$];
  }

  public validarRegistro(result:any){
    console.log(result[0]);
    // this.controlador++;
    if (result[0]){
      this.errorDetection = false;
      
      if (this.countEvent == 4){
        this.countEvent = 0;
        if (this.countFaceAcept >= this.cantFaceAcept){
          // console.log('Es la persona');'
          localStorage.setItem('_id',this.examen);
          this.router.navigateByUrl('/main-estudiante/examen/accept')
        }else{
          this.router.navigateByUrl('/main-estudiante/examen/no-accept')
        }
      }else{
        // console.log(result[0]);
        
        this.countEvent++;
        if (result[0]._label != 'unknown'){
          this.countFaceAcept++;
        }
      }

    }else{
      console.log('No se a detectado nada');
      this.errorDetection = true;
    }

  }

  public drawFace = (resizeDetections : any, displaySize : any) => {
    const {globalFace} = this.faceApiService;
    this.overCanvas.getContext('2d').clearRect('0','0', displaySize.width, displaySize.height);
    globalFace.draw.drawDetections(this.overCanvas, resizeDetections);
  }

  public checkFace = () => {
    setInterval( async () => {
      await this.videoPlayService.getLandMark(this.videoElement);
    }, 3000);
  }


  public loadedMetaData(): void {
    console.log('hola');
    this.videoElement.nativeElement.play();
  }

  public listenerPlay(){
    const {globalFace} = this.faceApiService;
    this.overCanvas = globalFace.createCanvasFromMedia(this.videoElement.nativeElement);
    this.renderer2.setProperty(this.overCanvas, 'id', 'new-canvas-over');
    this.renderer2.setStyle(this.overCanvas, 'z-index', '-1');
    this.renderer2.appendChild(this.elementRef.nativeElement, this.overCanvas);
  }
  
}
