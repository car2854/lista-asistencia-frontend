import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-estudiante',
  templateUrl: './login-estudiante.component.html',
  styleUrls: ['./login-estudiante.component.css']
})
export class LoginEstudianteComponent implements OnInit {

  public loginForm = this.fb.group({
    email   : ['juan@gmail.com', [Validators.required, Validators.email]],
    ci      : ['9843300', [Validators.required]]
  });

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {}

  public login(){
    this.estudianteService.login(this.loginForm.value)
    .subscribe((resp:any) => {
      this.router.navigateByUrl('main-estudiante/materias');
    }, (err) => {
      Swal.fire("Error", err.error.msg, 'error');
    })
  }

}
