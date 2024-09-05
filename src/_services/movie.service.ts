import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { MovieDetail } from '../_models/movie';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends CommonService {
  // Méthode pour changer l'ID du film
  setMovieId(id: number) {
    localStorage.setItem('movieId', id.toString());
  }

  getMovieInfo(id: number): Observable<MovieDetail> {
    let parameters = super.getOptions();

    return this.http.post<MovieDetail>(this.BACK_URL + '/infos/movie', {
      id,
      parameters,
    });
  }
}
