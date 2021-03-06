import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterForm } from '../../interfaces/registerProfesor-form';

@Component({
  selector: 'app-login-estudiante',
  templateUrl: './login-estudiante.component.html',
  styleUrls: ['./login-estudiante.component.css']
})
export class LoginEstudianteComponent implements OnInit {

  public loginForm = this.fb.group({
    email   : ['sheldon@gmail.com', [Validators.required, Validators.email]],
    ci      : ['9843300', [Validators.required]]
  });

  public sendForm: boolean = false;

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {}

  public campoNoValido(campo:string):boolean{
    
    if (this.loginForm.get(campo)?.invalid && !this.sendForm){
      return true
    }else{
      return false;
    }

  }

  public login(){

    if (!this.sendForm && this.loginForm.invalid){
      return;
    }

    this.sendForm = true;

    this.estudianteService.login(this.loginForm.value)
    .subscribe((resp:any) => {
      this.router.navigateByUrl('main-estudiante/materias');
    }, (err) => {
      this.sendForm = false;
      Swal.fire("Error", err.error.msg, 'error');
    })
  }

}
