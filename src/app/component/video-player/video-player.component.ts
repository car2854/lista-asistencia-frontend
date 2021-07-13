import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Estudiante } from '../../models/estudiante.model';
import { EstudianteService } from '../../services/estudiante.service';
import { Subscription, Observable } from 'rxjs';
import { SocketReconocimientoService } from '../../services/socket-reconocimiento.service';

import { UploadService } from '../../services/upload.service';

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

  public errorDetection:boolean = false;


  private subcripcion!: Subscription;
 
  constructor(
    private renderer2: Renderer2,
    private estudianteService: EstudianteService,
    private uploadService: UploadService,
    
    public wsReconocimiento: SocketReconocimientoService
    ) { }
    
    ngOnInit(): void {    
    this.estudiante = this.estudianteService.estudiante;
    this.modelsReady = true;
    this.checkFace();


    this.subcripcion = this.wsReconocimiento.getVideo()
      .subscribe((resp :any) => {
        var img = <HTMLImageElement> document.getElementById("frame");	
        img.src = resp;
        
      })

  }

  ngOnDestroy(): void {

    this.subcripcion.unsubscribe();

    clearInterval(this.interval);
  }

  public checkFace(){
    
    this.interval = setInterval( async() => {

      let canvas = <HTMLCanvasElement>document.getElementById('canvas');

      if (canvas){
        canvas.width = 640;
        canvas.height = 480;
        canvas.getContext('2d')?.drawImage(this.videoElement.nativeElement, 0, 0, 640, 480);
      }

      let img = <HTMLImageElement> document.getElementById("frame");	
      img.src = canvas.toDataURL();
      


      let foto1 = <HTMLImageElement> document.getElementById("foto1");	
      let foto2 = <HTMLImageElement> document.getElementById("foto2");	
      let foto3 = <HTMLImageElement> document.getElementById("foto3");	

      console.log(foto1.src);
      
      


      const imageByteface = this.convertirFormato(img);
      // const imageByteFoto1 = this.convertirFormato(foto1);
      // const imageByteFoto2 = this.convertirFormato(foto2);
      // const imageByteFoto3 = this.convertirFormato(foto3);




      

      // this.wsReconocimiento.emitVideo(imageByteFoto1, this.estudiante.foto1, this.estudiante.foto2, this.estudiante.foto3);

      

    }, 5000);
  }


  public convertirFormato(img:any){

    let jpg = true;
    let image = null;
    try{
      image = atob(img.src.split("data:image/jpeg;base64")[1]);
    } catch(e) {
      jpg = false;
    }

    if (jpg == false){
      try{
        image = atob(img.src.split("data:image/png;base64,")[1]);
      } catch(e){
        alert("No an image file Rekognition can process");
        console.log(e);
        return;
      }
    }
    
    let imageBytes;
    let length = image?.length;
    if (length){
      imageBytes = new ArrayBuffer(length);
      let ua = new Uint8Array(imageBytes);
      for (let i=0; i<length; i++){
          if(image?.charCodeAt(i)){
            ua[i] = image?.charCodeAt(i);
          }
      }
    }

    return imageBytes;

  }

  public loadedMetaData(): void {
    this.videoElement.nativeElement.play();
  }

  public listenerPlay(){
    // const {globalFace} = this.faceApiService;
    // this.overCanvas = globalFace.createCanvasFromMedia(this.videoElement.nativeElement);
    // this.renderer2.setProperty(this.overCanvas, 'id', 'new-canvas-over');
    // this.renderer2.setStyle(this.overCanvas, 'z-index', '-1');
    // this.renderer2.appendChild(this.elementRef.nativeElement, this.overCanvas);
  }
  
}
