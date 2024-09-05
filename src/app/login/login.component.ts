import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { WatchProvidersComponent } from './watch-providers/watch-providers.component';
import { CommonModule } from '@angular/common';
import { GenresComponent } from '../preferences/genres/genres.component';
import { MOVIE_GENRES } from '../../_const/movieGenres';
import { GenreResults } from '../../_models/genre';
import { provideAnimations } from '@angular/platform-browser/animations';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { SigninComponent } from './signin/signin.component';
import { BackgroundService } from '../../_services/background.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDividerModule,
    WatchProvidersComponent,
    CommonModule,
    GenresComponent,
    MatButtonModule,
    RouterModule,
    SigninComponent,
  ],
  providers: [provideAnimations()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  displayWatchProviders = true;
  genres: GenreResults[] = MOVIE_GENRES;
  constructor(
    private authService: AuthService,
    private backgroundService: BackgroundService
  ) {}

  ngOnInit(): void {
    this.backgroundService.setBackgroundImage('../../assets/img/settings.jpeg');
    if (!this.authService.isAuthenticated()) {
    }
  }
  handleWatchProviderEvent(event: boolean) {
    this.displayWatchProviders = !event;
  }
}
