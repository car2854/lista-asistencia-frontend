import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-accept',
  templateUrl: './no-accept.component.html',
  styleUrls: ['./no-accept.component.css']
})
export class NoAcceptComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.recargar();
  }

  public recargar(){

    if (localStorage.getItem('recargar')){
      window.location.reload();
    }

  }

}
