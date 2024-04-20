import { UserService } from './../../../_services/user.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CountriesCode } from '../../_enum/CountryCode';
import { CommonModule } from '@angular/common';

import { enumToArray } from '../../_helper/enumToArray';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TruncatePipe } from '../../../_pipe/truncate.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-production-countries',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TruncatePipe,
    FormsModule,
  ],
  templateUrl: './production-countries.component.html',
  styleUrl: './production-countries.component.css',
})
export class ProductionCountriesComponent implements OnInit {
  checkAll = true;
  filter = '';
  private _countriesCode: any;
  private _countriesCodeBackup: any;
  get countriesCode() {
    return this._countriesCode;
  }

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    const userSetting = this.userService.getOption('with_origin_country', '|');
    let countriesCodes = [];
    enumToArray(CountriesCode).forEach((country) => {
      countriesCodes.push({
        ...country,
        checked: userSetting?.includes(country.key),
      });
    });
    this._countriesCode = this._countriesCodeBackup =
      enumToArray(CountriesCode);
  }

  handleImageError(index: number) {
    this.countriesCode.splice(index, 1);
  }

  handleBatchCheck() {
    this._countriesCodeBackup = this.countriesCode.map((countryCode: any) => ({
      ...countryCode,
      checked: this.checkAll,
    }));
    this._countriesCode = this._countriesCodeBackup;
    this.setUserSetting();
  }

  handleInputChange(event: any) {
    const filterValue = event.target.value.toLowerCase().trim().toLowerCase();
    this._countriesCode = [];
    const filteredCountries = this._countriesCodeBackup.filter((country: any) =>
      country.value.toLowerCase().includes(filterValue)
    );
    this._countriesCode = filteredCountries.map((country: any) => ({
      key: country.key,
      value: country.value,
      checked: country.checked || false, // utilisez la valeur de checked d'origine ou false par défaut
    }));
  }

  handleCheckValueChange(event: any, currentCountry: string) {
    this._countriesCodeBackup.find(
      (country: any) => country.key === currentCountry
    ).checked = event.checked;
    this._countriesCode = this._countriesCodeBackup;
    this.setUserSetting();
  }

  setUserSetting() {
    this.userService.setOption(
      'with_origin_country',
      this._countriesCodeBackup
        .filter((country: any) => country.checked)
        .map((country: any) => country.key)
        .join('|')
    );
  }
}
