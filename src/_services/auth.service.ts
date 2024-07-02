import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, interval, tap } from 'rxjs';
import { User } from '../_models/user';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environment/environment';
import { TokenResponse } from '../_models/tokenResponse';
import { Credential } from '../_models/credential';
import { UserService } from './user.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new Subject<boolean>();
  user!: User;

  constructor(private http: HttpClient, private commonService: CommonService) {
    interval(5000).subscribe(() =>
      this.authChanged.next(this.isAuthenticated())
    );
  }

  isAuthenticated() {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return false;
    }
    const data: any = jwtDecode(token);
    this.user = data;
    return this.deleteToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userParameters');
    this.authChanged.next(false);
  }

  authenticate(credentials: Credential) {
    return this.http
      .post(environment.backUrl + '/login_check', credentials)
      .pipe(
        tap((data: TokenResponse) => {
          this.authChanged.next(true);
          localStorage.setItem('token', data.token ?? '');
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    if (Date.now() > this.user.exp * 1000) {
      this.logout()
      return false;
    }

    return Date.now() < this.user.exp * 1000;
  }

  isUserParametersSet() {
    const options = this.commonService.getOptions();
    delete options['language'];
    return Object.keys(options).length > 0;
  }
}
