import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-page-estudiante',
  templateUrl: './page-estudiante.component.html',
  styleUrls: ['./page-estudiante.component.css']
})
export class PageEstudianteComponent implements OnInit {

  constructor(
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
  }

  public signOff(){
    this.estudianteService.logout();
  }

}
