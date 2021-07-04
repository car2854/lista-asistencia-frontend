import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../services/profesor.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private profesorService: ProfesorService
  ) { }

  ngOnInit(): void {
  }


  public signOff(){
    this.profesorService.logout();
  }
}
