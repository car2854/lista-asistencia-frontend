import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfesorService } from '../../services/profesor.service';

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
    private fb: FormBuilder,
    private profesorService: ProfesorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public register(){

    const formData = {
      nombre: this.registerForm.value.name,
      password: this.registerForm.value.password1,
      email: this.registerForm.value.email
    }

    this.profesorService.register(formData)
      .subscribe((resp:any) => {
        this.router.navigateByUrl('main/materias');
      }, (err) => {
        Swal.fire("Error", err.error.msg, 'error');
      })

  }

}
