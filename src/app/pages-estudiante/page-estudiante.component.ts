import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiante.model';
import { EstudianteService } from '../services/estudiante.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-page-estudiante',
  templateUrl: './page-estudiante.component.html',
  styleUrls: ['./page-estudiante.component.css']
})
export class PageEstudianteComponent implements OnInit {

  public estudiante!: Estudiante;

  constructor(
    private estudianteService: EstudianteService,
  ) { }

  ngOnInit(): void {
    this.estudiante = this.estudianteService.estudiante;
  }

  public signOff(){
    this.estudianteService.logout();
  }

}
