import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenreResults } from '../../../_models/genre';
import { UserService } from '../../../_services/user.service';
import { PreferencesService } from '../../../_services/preferences.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MOVIE_GENRES } from '../../../_const/movieGenres';
@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, MatSlideToggleModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent implements OnInit {
  @Input() genres: GenreResults[] = [];
  @Output() withoutGenres = new EventEmitter<GenreResults[]>();

  public without_genres: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.genres.sort((a, b) => a.name.localeCompare(b.name));

    let userWithoutGenres = this.userService.getOption('without_genres', '|');
    if (!!userWithoutGenres?.length) {
      this.without_genres = (userWithoutGenres as string[]).map(
        (genre: string) => genre
      );
    }
    this.withoutGenresEmitter();
  }
  handleCheckboxChange(event: any, genreId: number) {
    let userWithoutGenres =
      (this.userService.getOption('without_genres', '|') as string[]) ?? [];
    if (event.checked) {
      const index = userWithoutGenres.findIndex(
        (userWithoutGenre) => userWithoutGenre === String(genreId)
      );
      userWithoutGenres.splice(index, 1);
    } else {
      userWithoutGenres.push(String(genreId));
    }
    this.without_genres = userWithoutGenres;
    this.userService.setOption(
      'without_genres',
      [...new Set(userWithoutGenres)].join('|')
    );

    this.withoutGenresEmitter();
  }
  withoutGenresEmitter() {
    this.withoutGenres.emit(
      this.genres.filter((genre) =>
        this.without_genres.includes(genre.id.toString())
      )
    );
  }
}
