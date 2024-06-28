import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, forkJoin, map } from 'rxjs';
import { WatchProvider } from '../_models/watch_providers';
import { Genre } from '../_models/genre';
import { ApiOptions } from '../_models/apiOptions';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService extends CommonService {
  getWatchProvidersAll(): Observable<WatchProvider[]> {
    return this.http.post<WatchProvider[]>(this.BACK_URL + '/preferences/watch_providers/all', {});
  }

  getMoviesWatchProviders(): Observable<WatchProvider[]> {
    return this.http.post<WatchProvider[]>(this.BACK_URL + '/preferences/watch_providers/movies', {});
  }

  getGenres(): Observable<Genre> {
    return this.http.get<Genre>(this.API_URL + '/genre/movie/list', {
      params: super.getOptions(),
    });
  }

  getUserPreference(): Observable<ApiOptions> {
    return this.http.post<ApiOptions>(this.BACK_URL + '/preferences/', {});
  }

  setUserPreferences(preferences: ApiOptions) {
    return this.http.post(this.BACK_URL + '/preferences/set_preferences', {
      ...preferences,
    });
  }
}
