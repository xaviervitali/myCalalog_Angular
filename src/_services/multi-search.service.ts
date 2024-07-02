import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, forkJoin, of } from 'rxjs';
import { SearchMulti } from '../_models/search';

@Injectable({
  providedIn: 'root',
})
export class MultiSearchService extends CommonService {
  searchMovies(query: string, page = 1) {
    // let params = super.getOptions();

    // if (!!query) {
    //   params = params.set('query', query);
    //   params = params.set('page', page);
    //   return this.http.get<SearchMulti>(this.API_URL + '/search/movie', {
    //     params,
    //   });
    // }
    // return of(null);
  }

  searchTVs(query: string, page = 1) {
    // let params = super.getOptions();
    // if (!!query) {
    //   params = params.set('query', query);
    //   params = params.set('page', page);

    //   return this.http.get<SearchMulti>(this.API_URL + '/search/tv', {
    //     params,
    //   });
    // }
    // return of(null);
  }

  searchPersons(query: string, page = 1) {
    // let params = super.getOptions();
    // if (!!query) {
    //   params = params.set('query', query);
    //   params = params.set('page', page);

    //   return this.http.get<SearchMulti>(this.API_URL + '/search/person', {
    //     params,
    //   });
    // }
    // return of(null);
  }
}
