import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-content',
  templateUrl: './empty-content.component.html',
  styleUrls: ['./empty-content.component.css']
})
export class EmptyContentComponent implements OnInit {

  @Input() mensaje!: String;

  constructor() { }

  ngOnInit(): void {
  }

}
