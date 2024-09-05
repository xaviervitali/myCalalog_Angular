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
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
    path: 'movies',
    component: MoviesComponent,
    providers: [DiscoverService],
    canActivate: [AuthGuard],
  },
  {
    path: 'tv-shows',
    component: TvShowsComponent,
    providers: [DiscoverService],
    canActivate: [AuthGuard],
  },
  {
    path: 'movie',
    component: MovieComponent,
    providers: [MovieService],
    canActivate: [AuthGuard],
  },
  {
    path: 'actor/:id',
    component: ActorComponent,
    providers: [ActorService],
    canActivate: [AuthGuard],
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    providers: [PreferencesService],
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  { path: 'sign-in', component: SigninComponent },
];
