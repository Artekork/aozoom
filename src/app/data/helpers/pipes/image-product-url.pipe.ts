import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageProductUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: String | null): String | null{
    if (value){
      return `./assets/img/products/${value}`
    } else{
      return null;
    }
  }

}
