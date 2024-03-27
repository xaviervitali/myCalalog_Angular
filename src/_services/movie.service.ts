import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetail, VideoResponse } from '../_models/movie';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends CommonService {
  getMovieInfo(id: number): Observable<MovieDetail> {
    return this.http.get<any>(this.API_URL + '/movie/' + id, {
      params: super.getOptions(),
    });
  }

  getMovieWatchProviders(id: number) {
    return this.http.get<any>(
      this.API_URL + '/movie/' + id + '/watch/providers',
      {
        params: super.getOptions(),
      }
    );
  }

  getMovieVideos(id: number): Observable<VideoResponse> {
    return this.http.get<any>(this.API_URL + '/movie/' + id + '/videos', {
      params: super.getOptions(),
    });
  }

  getMovieCast(id: number) {
    return this.http.get<any>(this.API_URL + '/movie/' + id + '/credits', {
      params: super.getOptions(),
    });
  }
}
