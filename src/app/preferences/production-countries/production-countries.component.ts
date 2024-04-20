import { Component, OnInit } from '@angular/core';
import { CountriesCode } from '../../_enum/CountryCode';
import { CommonModule } from '@angular/common';

import { enumToArray } from '../../_helper/enumToArray';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-production-countries',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatCheckboxModule],
  templateUrl: './production-countries.component.html',
  styleUrl: './production-countries.component.css',
})
export class ProductionCountriesComponent implements OnInit {
  countriesCode: any = enumToArray(CountriesCode);
  ngOnInit(): void {}
  handleImageError(index: number) {
    this.countriesCode.splice(index, 1);
  }
}
