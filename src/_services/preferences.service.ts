import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, forkJoin, map } from 'rxjs';
import {
  WatchProviderResult,
  WatchProviders,
} from '../_models/watch_providers';
import { Genre } from '../_models/genre';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService extends CommonService {
  getWatchProviders(): Observable<any> {
    return forkJoin({
      movieProviders: this.http.get<WatchProviders>(
        this.API_URL + '/watch/providers/movie',
        {
          params: super.getOptions(),
        }
      ),
      tvShowProviders: this.http.get<WatchProviders>(
        this.API_URL + '/watch/providers/tv',
        {
          params: super.getOptions(),
        }
      ),
    }).pipe(
      map(
        (response: {
          movieProviders: WatchProviders;
          tvShowProviders: WatchProviders;
        }) => {
          // Fusionnez les résultats des fournisseurs de films et de séries TV
          const mergedResults: WatchProviderResult[] = [
            ...response.movieProviders.results,
            ...response.tvShowProviders.results,
          ];

          // Assurez-vous de supprimer les doublons s'ils existent
          const uniqueResults = this.removeDuplicates(
            mergedResults,
            'provider_id'
          );

          return { results: uniqueResults };
        }
      )
    );
  }
  private removeDuplicates(array: any[], key: string) {
    return array.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
    );
  }
  getGenres(): Observable<Genre> {
    return this.http.get<Genre>(this.API_URL + '/genre/movie/list', {
      params: super.getOptions(),
    });
  }
}
