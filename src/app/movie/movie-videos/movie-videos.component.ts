import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-videos.component.html',
  styleUrl: './movie-videos.component.css',
})
export class MovieVideosComponent {
  @Input() videos: any;
}
