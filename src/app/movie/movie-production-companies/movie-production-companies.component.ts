import { Component, Input } from '@angular/core';
import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-production-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-production-companies.component.html',
  styleUrl: './movie-production-companies.component.css',
})
export class MovieProductionCompaniesComponent {
  @Input() production_companies: any;
  public environment = environment;
}
