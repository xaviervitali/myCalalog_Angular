import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../_services/preferences.service';
import { forkJoin } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WatchProviderResult } from '../../_models/watch_providers';
import { environment } from '../../environment/environment';
import { UserService } from '../../_services/user.service';
import { GenreResults } from '../../_models/genre';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DragDropModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css',
})
export class PreferencesComponent implements OnInit {
  //public watchProviders: any = [];
  public with_genres: string[] = [];
  public without_genres: string[] = [];

  private genres: GenreResults[] = [];
  public formGroup = this.formBuilder.group({
    watchProviders: this.formBuilder.array([]),
    includeAdult: this.formBuilder.control(
      !!this.getUserOption('include_adult')
    ),
  });

  public apiPosterPath = environment.apiPosterPath;
  sortOrder: 'asc' | 'desc' = 'desc'; // Ordre de tri par défaut

  public orderBySelectValue = 'popularity';

  get watchProvidersCount(): number {
    return this.watchProvidersFormArray.value.filter(
      (watchProvider: WatchProviderResult) => watchProvider.checked
    ).length;
  }
  get watchProvidersFormArray(): FormArray {
    return this.formGroup.get('watchProviders') as FormArray;
  }

  constructor(
    private preferencesService: PreferencesService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    forkJoin({
      watchProviders: this.preferencesService.getWatchProviders(),
      genres: this.preferencesService.getGenres(),
    }).subscribe((results) => {
      // WatchProviders
      const watchProviders = results.watchProviders.results.sort(
        (
          watchProviderA: { provider_name: string },
          watchProviderB: { provider_name: string }
        ) =>
          watchProviderA.provider_name.localeCompare(
            watchProviderB.provider_name
          )
      );
      const userWatchProviders = this.getUserOption(
        'with_watch_providers',
        '|'
      );
      watchProviders.forEach((watchProvider: WatchProviderResult) => {
        const isChecked = userWatchProviders?.includes(
          String(watchProvider.provider_id)
        );

        this.watchProvidersFormArray.push(
          this.newWatchProvider(
            watchProvider.provider_id,
            watchProvider.provider_name,
            watchProvider.logo_path,
            isChecked
          )
        );
      });

      // Genres
      const userWithoutGenres = this.getUserOption('without_genres', '|');
      this.genres = results.genres.genres;

      results.genres.genres.forEach((genre) => {
        if (userWithoutGenres?.includes(genre.id)) {
          this.without_genres.push(genre.name);
          return;
        }
        this.with_genres.push(genre.name);
      });
    });
    // sort_by
    const orderBy = this.getUserOption('sort_by', '.');
    if (!!orderBy.length) {
      this.orderBySelectValue = orderBy[0];
    }
  }

  private newWatchProvider(
    provider_id: number,
    provider_name: string,
    logo_path: string,
    checked: boolean
  ): FormGroup {
    return this.formBuilder.group({
      provider_id,
      provider_name,
      logo_path,
      checked: checked,
    });
  }

  setWatchProviders() {
    const selectedWatchProviders = this.watchProvidersFormArray.value.filter(
      (watchProvider: any) => watchProvider.checked
    );

    const selectedWatchProvidersIds = selectedWatchProviders.map(
      (watchProvider: WatchProviderResult) => watchProvider.provider_id
    );

    this.userService.setOption(
      'with_watch_providers',
      selectedWatchProvidersIds.join('|')
    );
  }

  getUserOption(name: string, separator = ''): any {
    let optionValue: any = this.userService.getOption(name);
    if (!optionValue) {
      return null;
    }

    if (!!separator && typeof optionValue === 'string') {
      optionValue = optionValue.split(separator);
    }

    return optionValue;
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
    const withoutGenres: number[] = [];

    this.without_genres.forEach((genreName) => {
      const currentGenre = this.genres.find(
        (genre) => genre.name === genreName
      );
      if (currentGenre) {
        withoutGenres.push(currentGenre.id);
      }
    });
    this.userService.setOption('without_genres', withoutGenres.join('|'));
  }

  handleAdultContentCheckbox(event: any) {
    const isChecked = event.target.checked;
    const optionName = 'include_adult';
    if (isChecked) {
      this.userService.setOption(optionName, true);
    } else {
      this.userService.removeOption(optionName);
    }
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Inversion de l'ordre de tri
    let orderBy = this.getUserOption('sort_by', '.');
    if (!!orderBy?.length) {
      this.userService.setOption('sort_by', orderBy[0] + '.' + this.sortOrder);
    }
  }

  handleOrderByChange(event: any) {
    this.userService.setOption('sort_by', event + '.' + this.sortOrder);
  }
}
