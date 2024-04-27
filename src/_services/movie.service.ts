import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetail } from '../_models/movie';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends CommonService {
  getMovieInfo(id: number): Observable<MovieDetail> {
    const appendToResponse = [
      'watch/providers',
      'videos',
      'credits',
      'recommendations',
      'release_dates',
    ];
    let params = super.getOptions();
    params = params.append('append_to_response', appendToResponse.join());
    return this.http.get<any>(this.API_URL + '/movie/' + id, {
      params,
    });
  }
}
