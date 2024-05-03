import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductionCountry } from '../../../_models/movie';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CountriesCodes as CountriesCodeEnum } from '../../_enum/CountryCode';
import { enumToArray } from '../../_helper/enumToArray';

@Component({
  selector: 'app-production-countries',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './production-countries.component.html',
  styleUrl: './production-countries.component.css',
})
export class ProductionCountriesComponent {
  countriesCodeArray = enumToArray(CountriesCodeEnum);
  @Input() productionCoutries: ProductionCountry[] = [];
  getCountryName(isoCode: string): string {
    const country = this.countriesCodeArray.find((c) => c.key === isoCode);
    return country ? country.value : '';
  }
}
