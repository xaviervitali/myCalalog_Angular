import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class TvShowService extends CommonService {
  getTvShowInfo(id: number) {
    let options = super.getOptions();
    options = options.set('append_to_response', 'watch/providers,credits');
    return this.http.get<any>(this.API_URL + '/tv/' + id, {
      params: options,
    });
  }
}
