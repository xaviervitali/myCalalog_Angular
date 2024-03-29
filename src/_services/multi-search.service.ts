import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, of } from 'rxjs';
import { SearchMulti } from '../_models/search';

@Injectable({
  providedIn: 'root',
})
export class MultiSearchService extends CommonService {
  multiSearch(query: string): Observable<SearchMulti | null> {
    let params = super.getOptions();

    if (!!query) {
      params = params.set('query', query);
      return this.http.get<SearchMulti>(this.API_URL + '/search/multi', {
        params,
      });
    }
    return of(null);
  }
}
