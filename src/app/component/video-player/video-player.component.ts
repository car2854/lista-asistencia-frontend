import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { FaceApiService } from '../../services/face-api.service';
import { VideoPlayService } from '../../services/video-play.service';
import { Estudiante } from '../../models/estudiante.model';
import { EstudianteService } from '../../services/estudiante.service';
import { Examen } from '../../models/examen.model';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { SocketReconocimientoService } from '../../services/socket-reconocimiento.service';

import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

  public interval: any;

  @ViewChild('videoElement') videoElement!: ElementRef;
  @Input() stream:any;
  @Input() width!: number;
  @Input() height!: number;
  @Input() examen!: string;

  public modelsReady: boolean = false;

  public listEvents:Array<any> = [];

  public overCanvas: any;

  public estudiante!: Estudiante;

  // private imagenesCargadas: boolean = false;

  // private countEvent: number = 0;
  // private countFaceAcept: number = 0;
  // private cantFaceAcept: number = 3;

  // private subscription1: Subscription = new Subscription;
  // private subscription2: Subscription = new Subscription;

  public errorDetection:boolean = false;


  private subcripcion!: Subscription;








  private modelosForLoad = [
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),

    // faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
  ]

  constructor(
    private renderer2: Renderer2,
    // private elementRef: ElementRef,
    // private faceApiService: FaceApiService,
    // private videoPlayService: VideoPlayService,
    // private router: Router,
    private estudianteService: EstudianteService,
    
    public wsReconocimiento: SocketReconocimientoService
    ) { }
    
    ngOnInit(): void {    
      
    this.loadModels();
      



    this.estudiante = this.estudianteService.estudiante;
    // this.listenerEvent();
    this.modelsReady = true;
    this.checkFace();


    this.subcripcion = this.wsReconocimiento.getVideo()
      .subscribe((resp :any) => {
        // var img = <HTMLImageElement> document.getElementById("frame");	
        // img.src = resp;
        console.log(resp);
        
      })

    

  }



  public loadModels = () => {
    Promise.all(this.modelosForLoad).then((resp) => {
      console.log('Modelos cargados');
    })
  }


  
  ngOnDestroy(): void {

    this.subcripcion.unsubscribe();

    // this.subscription1.unsubscribe();
    // this.subscription2.unsubscribe();

    clearInterval(this.interval);
  }

  // Aqui esta el error
  // public listenerEvent = () => {

  //   this.subscription1 = this.faceApiService.cbModels.subscribe(res => {
  //     // TODO: Los modelos estan listo
      
  //     if (!this.imagenesCargadas){
  //       this.videoPlayService.cargarImagenes();
  //       this.imagenesCargadas = true;
  //     }

  //     this.checkFace();
  //   }, (err) => {
  //     console.log(err);
      
  //   })
    
  //   this.subscription2 = this.videoPlayService.cbAi
  //     .subscribe( ({results1, results2, results3, resizedDetections, displaySize, results}) => {

      
  //       this.validarRegistro(results);

  //       resizedDetections = resizedDetections[0] || null;
        

  //       if (resizedDetections){
  //         this.drawFace(resizedDetections, displaySize);
  //       }
  //     });

  // }

  // public validarRegistro(result:any){
  //   console.log(result[0]);
  //   // this.controlador++;
  //   if (result[0]){
  //     this.errorDetection = false;
      
  //     if (this.countEvent == 4){
  //       this.countEvent = 0;
  //       if (this.countFaceAcept >= this.cantFaceAcept){
  //         // console.log('Es la persona');'
  //         localStorage.setItem('_id',this.examen);
  //         this.router.navigateByUrl('/main-estudiante/examen/accept')
  //       }else{
  //         this.router.navigateByUrl('/main-estudiante/examen/no-accept')
  //       }
  //     }else{
  //       // console.log(result[0]);
        
  //       this.countEvent++;
  //       if (result[0]._label != 'unknown'){
  //         this.countFaceAcept++;
  //       }
  //     }

  //   }else{
  //     console.log('No se a detectado nada');
  //     this.errorDetection = true;
  //   }

  // }

  // public drawFace = (resizeDetections : any, displaySize : any) => {
  //   console.log('4');
  //   const {globalFace} = this.faceApiService;
  //   this.overCanvas.getContext('2d').clearRect('0','0', displaySize.width, displaySize.height);
  //   globalFace.draw.drawDetections(this.overCanvas, resizeDetections);
  // }

  public checkFace(){
    this.interval = setInterval( async() => {


      const canvas = <HTMLCanvasElement> document.getElementById('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx    = canvas.getContext('2d');

      // console.log(ctx);
      
      // if (ctx)
        // ctx.drawImage(this.videoElement.nativeElement, 0, 0, canvas.width, canvas.height)

      const video = <HTMLVideoElement>document.getElementById('video');

      // this.wsReconocimiento.emitVideo(canvas.toDataURL('image/png;base64,iVB'));
      
      // if (video){
      //   const canvas2 = faceapi.createCanvasFromMedia(video);
      //   console.log(canvas2);
      //   this.wsReconocimiento.emitVideo(canvas2);
      //   // document.body.append(canvas2);
      // }

      // detectSingleFace

      // const detectionsFaces = await faceapi.detectAllFaces(this.videoElement.nativeElement, new faceapi.TinyFaceDetectorOptions())
      // .withFaceLandmarks()
      // .withFaceDescriptors();

      // console.log('hola');
      
      // console.log(detectionsFaces);

      const canvas1 = faceapi.createCanvasFromMedia(this.videoElement.nativeElement);
      document.body.append(canvas1);
      console.log(canvas1);
      

      this.wsReconocimiento.emitVideo(canvas1, this.estudiante.foto1, this.estudiante.foto2, this.estudiante.foto3);

      

      // console.log(JSON.stringify(this.videoElement.nativeElement));

      // const canvas = document.createElement('canvas');
      // const context = canvas.getContext('2d');

      // if (context != null){  
      //   context.drawImage(this.videoElement.nativeElement, 0, 0, 640, 480);
      // }

      // console.log(context);
      

      // this.wsReconocimiento.emitVideo(this.videoElement.nativeElement);
      // await this.videoPlayService.getLandMark(this.videoElement);
    }, 5000);
  }


  public loadedMetaData(): void {
    this.videoElement.nativeElement.play();
    // console.log(this.videoElement);
        
  }

  public listenerPlay(){
    // const {globalFace} = this.faceApiService;
    // this.overCanvas = globalFace.createCanvasFromMedia(this.videoElement.nativeElement);
    // this.renderer2.setProperty(this.overCanvas, 'id', 'new-canvas-over');
    // this.renderer2.setStyle(this.overCanvas, 'z-index', '-1');
    // this.renderer2.appendChild(this.elementRef.nativeElement, this.overCanvas);
  }
  
}
