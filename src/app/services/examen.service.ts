import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ExamenForm } from '../interfaces/crearExamen.form';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(
    private httpClient: HttpClient
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

  public getExamenes(){
    return this.httpClient.get(`${base_url}/examen` ,this.headers);
  }

  public crearExamen(formData: ExamenForm){
    return this.httpClient.post(`${base_url}/examen`, formData, this.headers);
  }

  public getExamen(id: string){
    return this.httpClient.get(`${base_url}/examen/${id}`, this.headers);

    
  }

}
