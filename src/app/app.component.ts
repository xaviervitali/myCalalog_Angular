import { BackgroundService } from './../_services/background.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../_services/auth.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../_services/user.service';
import { COUNTRIES } from '../_const/countries';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'myCatalog';
  query: string = '';
  backgroudImage = '';

  constructor(
    private router: Router,
    public authService: AuthService,
    private userService: UserService,
    private backgroundService: BackgroundService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isUserParametersSet()) {
      const navigatorLanguage = navigator.language;

      const iso_3166_1 = COUNTRIES.find(
        (countrie) => countrie.languageTag === navigatorLanguage
      )?.iso3166;

      localStorage.setItem('language', navigatorLanguage);
      const userParameters = {
        language: navigatorLanguage,
        iso_3166_1,
      };

      localStorage.setItem('userParameters', JSON.stringify(userParameters));
    }
    this.backgroundService.backgroundImage$.subscribe((img) => {
      this.backgroudImage = 'url(' + img + ')';
    });
  }
  onSubmit() {
    this.router.navigate(['search', this.query]);
  }

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
