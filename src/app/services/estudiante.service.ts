import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { LoginForm } from '../interfaces/loginEstudiante-form';
import { Estudiante } from '../models/estudiante.model';
import { Observable, of } from 'rxjs';

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
}
