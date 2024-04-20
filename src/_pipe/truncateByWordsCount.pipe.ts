import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateByWordsCount',
  standalone: true,
})
/**
 * permet de tonquer un texte selon un nombre de mots
 */
export class TruncateByWordsCountPipe implements PipeTransform {
  transform(value: string, length: number): string {
    const wordArray = value.split(' ');
    const suffix = wordArray.length > length ? ' ...' : '';

    return wordArray.slice(0, length).join(' ') + suffix;
  }
}
