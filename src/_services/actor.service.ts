import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ActorService extends CommonService {
  getActorDetail(id: number) {
    return this.http.get<any>(this.API_URL + '/person/' + id, {
      params: this.getOptions(),
    });
  }

  getActorMovieCredits(id: number) {
    return this.http.get<any>(
      this.API_URL + '/person/' + id + '/movie_credits',
      {
        params: this.getOptions(),
      }
    );
  }
}
