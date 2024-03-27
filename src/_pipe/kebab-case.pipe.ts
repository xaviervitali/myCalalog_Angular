import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase',
  standalone: true,
})
export class KebabCasePipe implements PipeTransform {
  transform(str: string): string {
    const strArr = str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/\W/)
      .filter((str) => str);
    return strArr.join('-');
  }
}
