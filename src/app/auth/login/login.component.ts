import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email     : ['carlos@gmail.com', [Validators.required, Validators.email]],
    password  : ['123456', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public login(){
    
  }

}
