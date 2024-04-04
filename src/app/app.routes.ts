import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { ActorComponent } from './actor/actor.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { MovieService } from '../_services/movie.service';
import { ActorService } from '../_services/actor.service';
import { PreferencesService } from '../_services/preferences.service';
import { DiscoverService } from '../_services/discover.service';
import { MultiSearchService } from '../_services/multi-search.service';
import { SearchResultsComponent } from './seach-results/search-results.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { TvShowService } from '../_services/tv-show.service';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  {
    path: 'movies',
    component: MoviesComponent,
    providers: [DiscoverService],
  },
  {
    path: 'tv-shows',
    component: TvShowsComponent,
    providers: [DiscoverService],
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
    providers: [MovieService],
  },
  {
    path: 'actor/:id',
    component: ActorComponent,
    providers: [ActorService],
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    providers: [PreferencesService],
  },
  {
    path: 'search/:query',
    component: SearchResultsComponent,
    providers: [MultiSearchService],
  },
  {
    path: 'tv-show/:id',
    component: TvShowComponent,
    providers: [TvShowService],
  },
];
