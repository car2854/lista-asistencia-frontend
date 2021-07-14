import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(
    private http: HttpClient
  ) { }

  // public verify(video:any, img1:string, img2:string, img3:string){
  //   return this.http.get(`${base_url}/`);
  // }



}
