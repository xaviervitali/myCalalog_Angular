import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discover } from '../_models/discover';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class DiscoverService extends CommonService {
  getMovieList(page: number): Observable<Discover> {
    let params = this.getOptions();

    params = params.set('page', page);
    return this.http.get<any>(this.API_URL + '/discover/movie', {
      params,
    });
  }

  searchMovie(name: string): Observable<Discover> {
    return this.http.get<any>(this.API_URL + '/search/movie?query=' + name, {
      params: this.getOptions(),
    });
  }
}
