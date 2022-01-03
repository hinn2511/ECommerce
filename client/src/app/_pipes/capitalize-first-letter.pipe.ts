import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from '../_services/helper';


@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(value: string): string {
    return capitalize(value);
  }

}
