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
}
