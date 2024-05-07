import { UserService } from './../../../_services/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesCodes } from '../../../_enum/CountryCode';
import { CommonModule } from '@angular/common';

import { enumToArray } from '../../../_helper/enumToArray';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-production-countries',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './production-countries.component.html',
  styleUrl: './production-countries.component.css',
})
export class ProductionCountriesComponent implements OnInit {
  public countryCtrl = new FormControl();
  public filteredCountries!: Observable<any[]>;
  @Output() userCountries = new EventEmitter<string[]>();
  _selectedCountries: any[] = [];
  _countries: any[] = [];

  get selectedCountries() {
    return this._selectedCountries.sort((countryA, countryB) =>
      countryA.value.localeCompare(countryB.value)
    );
  }

  get countries() {
    const countries = this._countries;
    const firstLetters = [
      ...new Set(
        countries.map((country) => this.normalizeString(country.value[0]))
      ),
    ];

    const optGroup: any = [];
    firstLetters.forEach((firstLetter) => {
      optGroup.push({
        firstLetter,
        countries: countries
          .filter((country) => !this.selectedCountries.includes(country))
          .filter(
            (country) => this.normalizeString(country.value[0]) === firstLetter
          ),
      });
    });
    return optGroup;
  }

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this._countries = enumToArray(CountriesCodes).sort((countryA, countryB) =>
      countryA.value.localeCompare(countryB.value)
    );
    const userSelectedCountries = this.userService.getOption(
      'with_origin_country',
      '|'
    ) as string[];

    this.filteredCountries = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.value)),
      map((name) =>
        name ? this._filterCountries(name, []) : this.countries.slice()
      )
    );

    userSelectedCountries?.forEach((countryCode) => {
      const country = this.countries.find(
        (country: any) => country.key === countryCode
      );
      this.selectedCountries.push(country);
      this.filteredCountries = this.filteredCountries.pipe(
        map((countries) => countries.filter((p) => p !== country))
      );
      this.userCountries.emit(userSelectedCountries);
    });
  }

  setUserSetting() {
    this.userService.setOption(
      'with_origin_country',
      this.selectedCountries.map((e) => e.key).join('|')
    );
  }

  addCountry(country: any) {
    this.selectedCountries.push(country);

    this.countryCtrl.setValue('');
    this.filteredCountries = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.value)),
      map((name) =>
        name
          ? this._filterCountries(name, this.selectedCountries)
          : this.countries
      )
    );
    this.userCountries.emit(this.selectedCountries);
    this.setUserSetting();
  }
  removeSelectedCountry(country: any) {
    const index = this.selectedCountries.indexOf(country);

    if (index !== -1) {
      this.selectedCountries.splice(index, 1);
      this.filteredCountries = this.countryCtrl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.value)),
        map((name) =>
          name
            ? this._filterCountries(name, this.selectedCountries)
            : this.countries
        )
      );

      this.userCountries.emit(this.selectedCountries);
      this.setUserSetting();
    }
  }

  private _filterCountries(value: string, selectedCountries: any[]): any[] {
    const filterValue = value.toLowerCase();

    return this.countries
      .map((group: any) => ({
        firstLetter: group.firstLetter,
        countries: group.countries.filter(
          (country: any) =>
            country.value.toLowerCase().indexOf(filterValue) === 0 &&
            !selectedCountries.includes(country)
        ),
      }))
      .filter((group: any) => group.countries.length > 0);
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
