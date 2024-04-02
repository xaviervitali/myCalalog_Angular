import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
  standalone: true,
})
export class MapPipe implements PipeTransform {
  transform(array: any[], field: string, separator = ', '): string {
    return array.map((value) => value[field]).join(separator);
  }
}
