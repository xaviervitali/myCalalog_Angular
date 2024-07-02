import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetail } from '../_models/movie';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends CommonService {
  getMovieInfo(id: number): Observable<MovieDetail> {
    let parameters = super.getOptions();
    return this.http.post<any>(this.BACK_URL + '/infos/movie' , {id, parameters
    });
  }
}
