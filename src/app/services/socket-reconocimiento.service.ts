import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class SocketReconocimientoService {

  private estudiante!: Estudiante

  constructor(
    public wsService: WebsocketService,
    private estudianteService:EstudianteService
  ) {
    this.estudiante = this.estudianteService.estudiante
  }

  public emitVideo(data:any, id: string, img1: string, img2: string, img3: string){

    // console.log('hola');
    
    // console.log('socket');
    
    const payload = {
      'video': data,
      id,
      img1,
      img2,
      img3
    }
    this.wsService.emit('video', payload);
  }

  public getVideo(){
    return this.wsService.listen('setVideo');
  }

  

}
