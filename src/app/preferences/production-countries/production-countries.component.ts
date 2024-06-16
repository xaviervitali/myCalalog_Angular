import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { COUNTRIES } from '../../../_const/countries';
import { LocalizedString } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { ProductionCountryDialogComponent } from './production-country-dialog/production-country-dialog.component';
import { CountryGroup } from '../../../_models/country';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};
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
export class ProductionCountriesComponent implements OnInit, OnChanges {
  @Output() userSelectedCountriesEmitter = new EventEmitter<string[]>();
  @Input() userSelectedCountries_!: string;

  countryForm = this._formBuilder.group({
    countryGroup: '',
  });

  get userSelectedCountriesNames() {
    const userSelectedCountries = [...new Set([...this.selectedCountries])];
    return this.countries
      .filter((country) => userSelectedCountries.includes(country.key))
      .map((country) => this.normalizeString(country.value));
  }

  public selectedCountries: string[] = [];

  public countriesGroup: CountryGroup[] = [];
  public countryGroupOptions!: Observable<CountryGroup[]>;
  public countries = COUNTRIES;

  getCountryName(countryKey: string) {
    return this.countries.find((country) => countryKey === country.key)?.value;
  }
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initCountriesGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['userSelectedCountries_'] &&
      !!changes['userSelectedCountries_'].currentValue
    ) {
      this.selectedCountries = [
        ...new Set([
          ...this.selectedCountries,
          ...changes['userSelectedCountries_'].currentValue.split('|'),
        ]),
      ].filter((e) => !!e);
      this.initCountriesGroup();
    }
  }

  private _filterGroup(value: string): CountryGroup[] {
    if (value) {
      return this.countriesGroup
        .map((group) => {
          return {
            letter: group.letter,
            countries: _filter(group.countries, value).filter(
              (e) => !this.userSelectedCountriesNames.includes(e)
            ),
          };
        })
        .filter((group) => group.countries.length > 0);
    }

    return this.countriesGroup;
  }

  public addCountry(event: string) {
    const country = this.countries.find(
      (country) => this.normalizeString(country.value) === event
    );
    if (!!country) {
      this.selectedCountries.push(country.key);
      this.initCountriesGroup();
      this.countryForm.get('countryGroup')?.setValue('');
      this.userSelectedCountriesEmitter.emit(this.selectedCountries);
    }
  }

  private normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  private initCountriesGroup() {
    this.countriesGroup = [];
    const countriesValues = this.countries.map((country) =>
      this.normalizeString(country.value)
    );
    const firstLetters = [
      ...new Set(
        countriesValues
          .map((country) => country[0])
          .sort((a, b) => a.localeCompare(b))
      ),
    ];

    firstLetters.forEach((firstLetter) => {
      const countries = countriesValues
        .filter((country) => this.normalizeString(country)[0] === firstLetter)
        .filter(
          (country) =>
            !this.userSelectedCountriesNames.includes(
              this.normalizeString(country)
            )
        );
      this.countriesGroup.push({
        letter: firstLetter,
        countries,
      });
    });
    this.countryGroupOptions = this.countryForm
      .get('countryGroup')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGroup(value || ''))
      );
  }

  removeCountry(event: string) {
    const dialogRef = this.dialog.open(ProductionCountryDialogComponent, {
      maxWidth: 800,
      disableClose: true,
      data: this.getCountryName(event),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedCountries = this.selectedCountries.filter(
          (countryCode) => countryCode !== event
        );
        this.initCountriesGroup();
        this.userSelectedCountriesEmitter.emit(this.selectedCountries);
      }
    });
  }
}
