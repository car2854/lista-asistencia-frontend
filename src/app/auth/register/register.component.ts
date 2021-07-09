import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  },{
    Validators: this.passwordsSame('password1','password2')
  });

  public sendForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profesorService: ProfesorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public campoNoValido(campo:string):boolean{
    
    if (this.registerForm.get(campo)?.invalid && !this.sendForm){
      return true
    }else{
      return false;
    }

  }

  public passwordsSame(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      console.log(pass1Control);
      console.log(pass2Control);
      

      if (pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({ noEsIgual: true });
      }

    }
  }

  public contrasenias(){
    const pass1 = this.registerForm.get('password1')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && !this.sendForm){
      return true;
    }else{
      return false;
    }
  }

  public register(){

    if (!this.sendForm && this.registerForm.invalid){
      return;
    }

    this.sendForm = true;

    const formData = {
      nombre: this.registerForm.value.name,
      password: this.registerForm.value.password1,
      email: this.registerForm.value.email
    }

    this.profesorService.register(formData)
      .subscribe((resp:any) => {
        this.router.navigateByUrl('main/materias');
      }, (err) => {
        this.sendForm = false;
        Swal.fire("Error", err.error.msg, 'error');
      })

  }

}
