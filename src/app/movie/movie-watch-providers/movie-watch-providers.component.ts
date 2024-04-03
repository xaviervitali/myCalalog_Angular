import { Component, Input } from '@angular/core';
import { environment } from '../../../environment/environment';
import { CommonModule, NgSwitch } from '@angular/common';

@Component({
  selector: 'app-movie-watch-providers',
  standalone: true,
  imports: [NgSwitch, CommonModule],
  templateUrl: './movie-watch-providers.component.html',
  styleUrl: './movie-watch-providers.component.css',
})
export class MovieWatchProvidersComponent {
  @Input() watchProviders: any;
  environment = environment;
}
