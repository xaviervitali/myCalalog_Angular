import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenreResults } from '../../../_models/genre';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { UserService } from '../../../_services/user.service';
import { PreferencesService } from '../../../_services/preferences.service';
@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent implements OnInit {
  private genres: GenreResults[] = [];
  public with_genres: string[] = [];
  public without_genres: string[] = [];

  @Output() withoutGenres = new EventEmitter<GenreResults[]>();

  constructor(
    private userService: UserService,
    private preferencesService: PreferencesService
  ) {}

  ngOnInit(): void {
    this.preferencesService.getGenres().subscribe((genresApiResponse) => {
      this.genres = genresApiResponse.genres;
      const userWithoutGenres = this.userService.getOption(
        'without_genres',
        '|'
      ) as string[];

      this.genres.forEach((genre) => {
        if (userWithoutGenres?.includes(String(genre.id))) {
          this.without_genres.push(genre.name);
          return;
        }
        this.with_genres.push(genre.name);
      });
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const withoutGenres: GenreResults[] = [];

    this.without_genres.forEach((genreName) => {
      const currentGenre = this.genres.find(
        (genre) => genre.name === genreName
      );
      if (currentGenre) {
        withoutGenres.push(currentGenre);
      }
    });
    this.withoutGenres.emit(withoutGenres);
    const withoutGenreIds = withoutGenres.map((genre) => genre.id);
    this.userService.setOption('without_genres', withoutGenreIds.join('|'));
  }
}
