import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { WatchProviders } from '../_models/watch_providers';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService extends CommonService {
  getProviders(): Observable<any> {
    return this.http.get(this.API_URL + '/watch/providers/movie', {
      params: this.getOptions(),
    });
  }
}
