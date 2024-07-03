import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ActorService extends CommonService {
  getCastDetail(id: number) {
    let parameters = super.getOptions();
    return this.http.post<any>(this.BACK_URL + '/infos/cast', {
      id,
      parameters,
    });
  }
}
