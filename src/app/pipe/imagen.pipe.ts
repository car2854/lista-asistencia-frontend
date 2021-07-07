import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string|undefined): string {
    if (!img){
      return `${base_url}/uploads/no-img`;
    }
    return img;
  }

}
