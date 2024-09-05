import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../environment/environment';
import { UserService } from './user.service';
import { ApiOptions } from '../_models/apiOptions';

export const BACK_URL = environment.backUrl;

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  protected BACK_URL = BACK_URL;

  constructor(private userService: UserService, protected http: HttpClient) {}

  public getOptions() {
    const userParameters = localStorage.getItem('userParameters');
    if (!!userParameters) {
      return JSON.parse(userParameters);
    }
    return false;
  }
}
