import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { WatchProviders } from '../_models/watch_providers';
import { Genre } from '../_models/genre';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService extends CommonService {
  getWatchProviders(): Observable<WatchProviders> {
    return this.http.get<WatchProviders>(
      this.API_URL + '/watch/providers/movie',
      {
        params: super.getOptions(),
      }
    );
  }

  getGenres(): Observable<Genre> {
    return this.http.get<Genre>(this.API_URL + '/genre/movie/list', {
      params: super.getOptions(),
    });
  }
}
