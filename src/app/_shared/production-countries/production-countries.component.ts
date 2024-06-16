import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductionCountry } from '../../../_models/movie';
import { MatTooltipModule } from '@angular/material/tooltip';
import { enumToArray } from '../../../_helper/enumToArray';

@Component({
  selector: 'app-production-countries',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './production-countries.component.html',
  styleUrl: './production-countries.component.css',
})
export class ProductionCountriesComponent {
  @Input() productionCoutries: ProductionCountry[] = [];
}
