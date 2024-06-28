import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { WatchProvidersComponent } from './watch-providers/watch-providers.component';
import { CommonModule } from '@angular/common';
import { GenresComponent } from '../preferences/genres/genres.component';
import { MOVIE_GENRES } from '../../_const/movieGenres';
import { GenreResults } from '../../_models/genre';
import {  provideAnimations } from '@angular/platform-browser/animations';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDividerModule,
    WatchProvidersComponent,
    CommonModule,
    GenresComponent,
    MatButtonModule

  ],
providers: [provideAnimations()], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent  {
  displayWatchProviders =true
  genres:GenreResults[] = MOVIE_GENRES

  handleWatchProviderEvent(event:boolean){
    
    this.displayWatchProviders = !event
  }
}
