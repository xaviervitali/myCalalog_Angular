import { Component, Input } from '@angular/core';
import { environment } from '../../../environment/environment';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-cast',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './movie-cast.component.html',
  styleUrl: './movie-cast.component.css',
})
export class MovieCastComponent {
  @Input() cast: any[] = [];
  environment = environment;
}
