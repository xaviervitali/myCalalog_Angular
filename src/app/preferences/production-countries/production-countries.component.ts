import { UserService } from './../../../_services/user.service';
import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CountriesCodes } from '../../_enum/CountryCode';
import { CommonModule } from '@angular/common';

import { enumToArray } from '../../_helper/enumToArray';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TruncatePipe } from '../../../_pipe/truncate.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { MatListModule } from '@angular/material/list';

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
  ],
  templateUrl: './production-countries.component.html',
  styleUrl: './production-countries.component.css',
})
export class ProductionCountriesComponent implements OnInit {
  public countryCtrl = new FormControl();
  public filteredCountries!: Observable<any[]>;
  @Output() userCountries = new EventEmitter<string[]>();
  _selectedCountries: any[] = [];
  countries: any[] = [];

  get selectedCountries() {
    return this._selectedCountries.sort((countryA, countryB) =>
      countryA.value.localeCompare(countryB.value)
    );
  }
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    const userSelectedCountries = this.userService.getOption(
      'with_origin_country',
      '|'
    ) as string[];

    this.countries = enumToArray(CountriesCodes).sort((countryA, countryB) =>
      countryA.value.localeCompare(countryB.value)
    );
    this.filteredCountries = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.value)),
      map((name) =>
        name ? this._filterCountries(name) : this.countries.slice()
      )
    );

    userSelectedCountries.forEach((countryCode) => {
      const country = this.countries.find(
        (country) => country.key === countryCode
      );
      this.selectedCountries.push(country);
      this.filteredCountries = this.filteredCountries.pipe(
        map((countries) => countries.filter((p) => p !== country))
      );
      this.userCountries.emit(userSelectedCountries);
    });
  }

  setUserSetting() {
    this.userService.setOption('with_origin_country', '');
  }

  addCountry(country: any) {
    this.selectedCountries.push(country);

    this.countryCtrl.setValue('');
    this.filteredCountries = this.filteredCountries.pipe(
      map((countries) => countries.filter((p) => p !== country))
    );
    this.userCountries.emit(this.selectedCountries);
  }
  removeSelectedCountry(country: any) {}

  private _filterCountries(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter((country: any) => {
      country.value.toLowerCase().indexOf(filterValue) === 0;
    });
  }
}
