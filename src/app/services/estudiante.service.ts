import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { LoginForm } from '../interfaces/loginEstudiante-form';
import { Estudiante } from '../models/estudiante.model';
import { Observable, of } from 'rxjs';
import { EstudianteForm } from '../interfaces/crearEstudiante-form';
import { InscribirEstudianteForm } from '../interfaces/inscribirEstudiante-form';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  public estudiante!: Estudiante;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  public saveStorage(token: string){
    return localStorage.setItem('token', token);
  }

  public login(formData: LoginForm){
    return this.http.post(`${base_url}/auth/login/estudiante`, formData)
      .pipe(
        tap( (resp:any) => {
          this.saveStorage(resp.token);
          this.estudiante = resp.estudianteDB;
        })
      )
  }

  public crearEstudiante(formData: EstudianteForm){

    return this.http.post(`${base_url}/estudiante`, formData, this.headers);

  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login-estudiante');
  }

  public validateToken(): Observable<boolean>{
    return this.http.get(`${base_url}/auth/renewEstudiante`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        this.estudiante = resp.estudianteDB;
        this.saveStorage(resp.token);
        return true

      }),
      catchError(err => of(false))
    )
  }

  public getEstudiantes(){

    return this.http.get(`${base_url}/estudiante`, this.headers);

  }

  public inscribirEstudiante(formData:InscribirEstudianteForm){
    return this.http.post(`${base_url}/estudiante/inscripcion`, formData, this.headers);
  }

  // localhost:4000/api/estudiante/60e74ff4d2884534d8bd6d63/60e55e939fc9440b745cf030
  public uninscribirEstudiante(id: string, materia: string){
    return this.http.delete(`${base_url}/estudiante/${id}/${materia}`, this.headers);
  }

  async guardarFotos(
    imagen1: File,
    imagen2: File,
    imagen3: File,
    id: string
  ){

    try {
      const url = `${base_url}/upload`;
      const formData = new FormData();
      formData.append('imagen1', imagen1);
      formData.append('imagen2', imagen2);
      formData.append('imagen3', imagen3);
      formData.append('id', id);


      const resp = await fetch( url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if (data.ok){
        return data.nombreArchivo;
      }else{
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }


  public getIngreso(id: string){
    return this.http.get(`${base_url}/estudiante/obtenerIngreso/${id}`, this.headers);
  }

  public ingresarExamen(examen: String){
    const data = {
      examen
    }

    return this.http.post(`${base_url}/estudiante/ingresar`, data, this.headers);

  }
}
