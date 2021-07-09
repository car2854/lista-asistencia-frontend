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

  public sendForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profesorService: ProfesorService
  ) { }

  ngOnInit(): void {
  }

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

    this.profesorService.login(this.loginForm.value)
    .subscribe( (resp:any) => {
      this.router.navigateByUrl('main/materias');
    }, (err) => {
      console.log(err);
      this.sendForm = false;
      Swal.fire("Error", err.error.msg, 'error');
    })
  }

}
