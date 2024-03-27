import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { ActorComponent } from './actor/actor.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { MovieService } from '../_services/movie.service';
import { ActorService } from '../_services/actor.service';
import { PreferencesService } from '../_services/preferences.service';
import { DiscoverService } from '../_services/discover.service';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
];
