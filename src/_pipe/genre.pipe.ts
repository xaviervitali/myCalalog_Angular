import { Pipe, PipeTransform } from '@angular/core';
import { TV_SHOW_GENRES } from '../_const/tvShowGenres';
import { MOVIE_GENRES } from '../_const/movieGenres';

@Pipe({
  name: 'genre',
  standalone: true,
})
export class GenrePipe implements PipeTransform {
  private movieGenres = MOVIE_GENRES;
  private tvShowGenres = TV_SHOW_GENRES;

  transform(id: number) {
    const genre =
      this.movieGenres.find((genre) => genre.id === id) ??
      this.tvShowGenres.find((genre) => genre.id === id);
    if (genre) {
      return genre.name;
    }
    return '';
  }
}
