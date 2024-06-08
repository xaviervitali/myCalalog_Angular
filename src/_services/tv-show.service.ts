import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, concat, of, pipe } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

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

  getSeasonsDetail(tvShowId: number, seasonCount: number): Observable<any> {
    const chunkSize = 2;
    const chunks = Array.from(
      { length: Math.ceil(seasonCount / chunkSize) },
      (_, i) => i * chunkSize
    );

    return concat(
      ...chunks.map((start) => {
        const end = Math.min(start + chunkSize, seasonCount);
        const appendToResponse = Array.from(
          { length: end - start },
          (_, i) => `season/${start + i + 1}`
        ).join(',');
        const options = super
          .getOptions()
          .set('append_to_response', appendToResponse);

        return this.http
          .get<any>(this.API_URL + '/tv/' + tvShowId, { params: options })
      })
    )
  }
}
