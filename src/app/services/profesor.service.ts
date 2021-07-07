import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { RegisterForm } from '../interfaces/registerProfesor-form';
import { environment } from '../../environments/environment.prod';
import { Profesor } from '../models/profesor.model';
import { LoginForm } from '../interfaces/loginProfesor-form';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  public profesor! :Profesor;

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

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  public login(formData: LoginForm){
    return this.http.post(`${base_url}/auth/login/profesor`, formData)
      .pipe(
        tap( (resp:any) => {
          this.saveStorage(resp.token);
          this.profesor = resp.profesorDB;
        })
      )
  }

  public register(formData: RegisterForm){
    return this.http.post(`${base_url}/profesor`, formData)
      .pipe(
        tap( (resp:any) => {
          this.saveStorage(resp.token);
          this.profesor = resp.profesor;
        })
      );
  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }

  public validateToken(): Observable<boolean>{
    return this.http.get(`${base_url}/auth/renewProfesor`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        this.profesor = resp.profesorDB;
        this.saveStorage(resp.token);
        return true

      }),
      catchError(err => of(false))
    )
  }

  public getProfesores(){
    return this.http.get(`${base_url}/profesor`);
  }

  public getProfesor(id:string){
    return this.http.get(`${base_url}/profesor/${id}`,this.headers);
  }
}
