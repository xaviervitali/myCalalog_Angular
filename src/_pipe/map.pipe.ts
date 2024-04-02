import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
  standalone: true,
})
/**
 * permet de mappr un tableau d'objet selon une clé et le renvoie joint sous forme de string
 */
export class MapPipe implements PipeTransform {
  transform(array: any[], field: string, separator = ', '): string {
    return array.map((value) => value[field]).join(separator);
  }
}
