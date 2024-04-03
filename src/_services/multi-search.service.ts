import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, forkJoin, of } from 'rxjs';
import { SearchMulti } from '../_models/search';

@Injectable({
  providedIn: 'root',
})
export class MultiSearchService extends CommonService {
  searchMovies(
    query: string
  ): Observable<SearchMulti | { results: []; total_results: 0 }> {
    let params = super.getOptions();
    if (!!query) {
      params = params.set('query', query);
      return this.http.get<SearchMulti>(this.API_URL + '/search/movie', {
        params,
      });
    }
    return of({ results: [], total_results: 0 });
  }

  searchTVs(
    query: string
  ): Observable<SearchMulti | { results: []; total_results: 0 }> {
    let params = super.getOptions();
    if (!!query) {
      params = params.set('query', query);
      return this.http.get<SearchMulti>(this.API_URL + '/search/tv', {
        params,
      });
    }
    return of({ results: [], total_results: 0 });
  }
  searchPersons(
    query: string
  ): Observable<SearchMulti | { results: []; total_results: 0 }> {
    let params = super.getOptions();
    if (!!query) {
      params = params.set('query', query);
      return this.http.get<SearchMulti>(this.API_URL + '/search/person', {
        params,
      });
    }
    return of({ results: [], total_results: 0 });
  }
}
