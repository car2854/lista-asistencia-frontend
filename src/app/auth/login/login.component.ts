import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfesorService } from '../../services/profesor.service';

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
    private fb: FormBuilder,
    private router: Router,
    private profesorService: ProfesorService
  ) { }

  ngOnInit(): void {
  }

  public login(){
    this.profesorService.login(this.loginForm.value)
    .subscribe( (resp:any) => {
      this.router.navigateByUrl('main/materias');
    }, (err) => {
      console.log(err);
      
      Swal.fire("Error", err.error.msg, 'error');
    })
  }

}
