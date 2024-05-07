import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, interval, tap } from 'rxjs';
import { User } from '../_models/user';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environment/environment';
import { TokenResponse } from '../_models/tokenRsponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new Subject<boolean>();
  user!: User;

  constructor(private http: HttpClient) {
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
    return Date.now() < data.exp * 1000;
  }

  logout() {
    localStorage.removeItem('token');
    this.authChanged.next(false);
  }
  authenticate(credentials: Credential) {
    return this.http.post(environment.apiUrl + '/login', credentials).pipe(
      tap((data: TokenResponse) => {
        this.authChanged.next(true);

        localStorage.setItem('token', data.token ?? '');
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
