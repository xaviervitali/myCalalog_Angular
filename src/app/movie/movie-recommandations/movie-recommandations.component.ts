import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-movie-recommandations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-recommandations.component.html',
  styleUrl: './movie-recommandations.component.css',
})
export class MovieRecommandationsComponent {
  environment = environment;
  @Input() recommendations: any;
  @Input() title: string = 'Similaire à';
}
