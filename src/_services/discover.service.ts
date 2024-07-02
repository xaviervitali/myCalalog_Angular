import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discover } from '../_models/discover';
import { CommonService } from './common.service';
import { Cacheable } from "ts-cacheable";

@Injectable({
  providedIn: 'root',
})



export class DiscoverService extends CommonService {

  getMovieList(page: number): Observable<Discover> {
    let parameters = super.getOptions();
    
    return this.http.post<Discover>(this.BACK_URL + '/discover/movies', {parameters
    });
  }

  // @Cacheable()
  getTVShowList(page: number = 1): Observable<Discover> {
    let params = super.getOptions();
    return this.http.post<Discover>(this.BACK_URL + '/discover/tvs', {
    });
  }
}
