import { Component, OnInit } from '@angular/core';
import { Profesor } from '../models/profesor.model';
import { ProfesorService } from '../services/profesor.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public profesor!: Profesor;

  constructor(
    private profesorService: ProfesorService
  ) { }

  ngOnInit(): void {
    this.profesor = this.profesorService.profesor;
  }


  public signOff(){
    this.profesorService.logout();
  }
}
