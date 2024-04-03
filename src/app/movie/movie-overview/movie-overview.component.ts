import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-overview',
  standalone: true,
  imports: [],
  templateUrl: './movie-overview.component.html',
  styleUrl: './movie-overview.component.css',
})
export class MovieOverviewComponent {
  @Input() overview: string = '';
}
