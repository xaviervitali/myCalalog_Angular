import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discover } from '../_models/discover';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class DiscoverService extends CommonService {
  getMovieList(page: number): Observable<Discover> {
    let params = super.getOptions();
    params = params.set('page', page);
    return this.http.get<any>(this.API_URL + '/discover/movie', {
      params,
    });
  }

  getTVShowList(page: number = 1) {
    let params = super.getOptions();
    params = params.set('page', page);
    return this.http.get<any>(this.API_URL + '/discover/movie', {
      params,
    });
  }
}
