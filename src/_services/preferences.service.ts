import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, forkJoin, map } from 'rxjs';
import {
  WatchProvider,
} from '../_models/watch_providers';
import { Genre } from '../_models/genre';
import { ApiOptions } from '../_models/apiOptions';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService extends CommonService {
  getWatchProviders(): Observable<any> {
    return this.http.get(this.BACK_URL + '/preferences/watch_providers')

  }


  getGenres(): Observable<Genre> {
    return this.http.get<Genre>(this.API_URL + '/genre/movie/list', {
      params: super.getOptions(),
    });
  }

  getUserPreference() : Observable<ApiOptions> {
    return this.http.get<ApiOptions>(this.BACK_URL + '/preferences')
  }
}
