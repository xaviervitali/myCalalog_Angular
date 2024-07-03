import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaType',
  standalone: true,
})


export class MediaTypePipe implements PipeTransform {
  transform(value: 'movie' | 'tv'): string {
    const medias = {
      movie: 'Film',
      tv: 'Série',
    };

    if (medias.hasOwnProperty(value)) {
      return medias[value];
    }
    return '';
  }
}
