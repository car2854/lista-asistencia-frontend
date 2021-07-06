import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { MateriaForm } from '../interfaces/crearMateria-form';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private http: HttpClient
  ) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  public getMateriasProfesor(){

    return this.http.get(`${base_url}/materia`, this.headers);

  }

  public crearMateria(formData:MateriaForm){
    return this.http.post(`${base_url}/materia`, formData, this.headers);
  }

  public getMateria(id: String){
  
    return this.http.get(`${base_url}/materia/${id}`, this.headers);

  }

  public getEstudiantesMateria(id: String){

    return this.http.get(`${base_url}/materia/estudiantes/${id}`, this.headers);

  }

  public getMateriasEstudiante(){
    return this.http.get(`${base_url}/materia/estudiante`, this.headers);
  }

  public getExamenesMateria(id:string){
    return this.http.get(`${base_url}/materia/examenes/${id}`, this.headers);
  }
}
