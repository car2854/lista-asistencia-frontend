import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent implements OnInit {

  @ViewChild('closeButton') closeModal!: ElementRef;
  @ViewChild('changeImg1') changeImg1!: ElementRef;
  @ViewChild('changeImg2') changeImg2!: ElementRef;
  @ViewChild('changeImg3') changeImg3!: ElementRef;

  public imgTemp1?: any;
  public imagenSubir1!: File;
  public imgTemp2?: any;
  public imagenSubir2!: File;
  public imgTemp3?: any;
  public imagenSubir3!: File;

  public sendForm: boolean = false;

  public estudianteForm = this.fb.group({
    email   : ['', [Validators.required]],
    nombre  : ['', [Validators.required]],  
    ci      : ['', [Validators.required]],
    foto1   : ['', [Validators.required]],
    foto2   : ['', [Validators.required]],
    foto3   : ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
  }

  public campoNoValido(campo:string):boolean{
    
    if (this.estudianteForm.get(campo)?.invalid && !this.sendForm){
      return true
    }else{
      return false;
    }

  }

  guardar(){

    if (!this.sendForm && this.estudianteForm.invalid){
      return;
    }

    this.sendForm = true;

    this.estudianteService.crearEstudiante(this.estudianteForm.value)
      .subscribe((resp: any) => {
        
        this.estudianteService.guardarFotos(this.imagenSubir1, this.imagenSubir2, this.imagenSubir3, resp.estudiante._id)
          .then(resp => {
            this.sendForm = false;
            Swal.fire('Guardados','Estudiante creado', 'success');
            this.closeModal.nativeElement.click();
          }).catch(err => {
            this.sendForm = false;
            console.log(err);
            Swal.fire('Error','No se pudo guardar las imagenes', 'error');
          })

      }, (err) => {
        this.sendForm = false;
        Swal.fire("Error", err.error.msg, 'error');
      })
  }

  public cambiarImagen1(event: Event){
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    
    this.imagenSubir1 = file;
    
    if (!file){
      return this.imgTemp1 = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp1 = reader.result;
    }

    return;
  }
  public cambiarImagen2(event: Event){
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    
    this.imagenSubir2 = file;
    
    if (!file){
      return this.imgTemp2 = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp2 = reader.result;
    }

    return;
  }
  public cambiarImagen3(event: Event){
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    
    this.imagenSubir3 = file;
    
    if (!file){
      return this.imgTemp3 = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp3 = reader.result;
    }

    return;
  }

  public changeEvent1(){    
    this.changeImg1.nativeElement.click();
  }
  public changeEvent2(){
    this.changeImg2.nativeElement.click();
  }
  public changeEvent3(){
    this.changeImg3.nativeElement.click();
  }

}
