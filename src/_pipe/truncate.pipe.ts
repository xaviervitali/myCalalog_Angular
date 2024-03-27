import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number): string {
    const wordArray = value.split(' ');
    const suffix = wordArray.length > length ? ' ...' : '';

    return wordArray.slice(0, length).join(' ') + suffix;
  }
}
