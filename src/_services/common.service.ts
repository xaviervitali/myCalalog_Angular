import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../environment/environment';
import { UserService } from './user.service';
import { ApiOptions } from '../_models/apiOptions';

export const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  protected API_URL = API_URL;

  options$ = this.userService.optionsSubject.asObservable();

  constructor(private userService: UserService, protected http: HttpClient) {}

  protected getOptions(): HttpParams {
    let httpParams = new HttpParams();
    this.userService.optionsSubject.subscribe((options) => {
      (Object.keys(options) as Array<keyof ApiOptions>).forEach((option) => {
        const value = options[String(option)];
        if (value) {
          httpParams = httpParams.set(String(option), String(value));
        }
      });
    });
    return httpParams;
  }
}
