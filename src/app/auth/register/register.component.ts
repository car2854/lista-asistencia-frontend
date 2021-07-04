import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.fb.group({
    name: ['Carlos', [Validators.required]],
    email: ['carlos@gmail.com', [Validators.required,Validators.email]],
    password1: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public register(){

  }

}
