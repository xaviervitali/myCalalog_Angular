import { ProductionCountriesComponent } from './production-countries/production-countries.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment/environment';
import { UserService } from '../../_services/user.service';
import { GenreResults } from '../../_models/genre';

// Material
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import moment, { Moment } from 'moment';
import { GenresComponent } from './genres/genres.component';
import { MapPipe } from '../../_pipe/map.pipe';
import { WatchProvidersComponent } from './watch-providers/watch-providers.component';
import { WatchProvider } from '../../_models/watch_providers';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MinutesToHoursPipe } from '../../_pipe/minutes-to-hours.pipe';
import { HeaderComponent } from '../_shared/header/header.component';
import { MatInputModule } from '@angular/material/input';

import { CertificationComponent } from './certification/certification.component';
import { SortComponent } from './sort/sort.component';
import { MOVIE_GENRES } from '../../_const/movieGenres';
import { TV_SHOW_GENRES } from '../../_const/tvShowGenres';
import { PreferencesService } from '../../_services/preferences.service';
import { ApiOptions } from '../../_models/apiOptions';
import { ReleaseDatesComponent } from './release-dates/release-dates.component';
import { VoteComponent } from './vote/vote.component';
import { RuntimeComponent } from './runtime/runtime.component';
import { Router } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAccordion,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatButtonModule,
    GenresComponent,
    MatCheckboxModule,
    MapPipe,
    WatchProvidersComponent,
    MatDividerModule,
    MinutesToHoursPipe,
    HeaderComponent,
    MatInputModule,
    ProductionCountriesComponent,
    CertificationComponent,
    SortComponent,
    ReleaseDatesComponent,
    VoteComponent,
    RuntimeComponent,
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css',
  providers: [provideNativeDateAdapter(MY_FORMATS), MinutesToHoursPipe],
})
export class PreferencesComponent implements OnInit {
  public movieGenres = MOVIE_GENRES;
  // public tvShowGenres = TV_SHOW_GENRES;

  public withoutGenres: GenreResults[] = [];
  public watchProviders: WatchProvider[] = [];
  public countries: string[] = [];
  public maxYear = moment().year();

  public apiPosterPath = environment.apiPosterPath;
  public voteCountGte = 0;
  public displayContent = [
    { value: 'flatrate', label: "Inclus dans l'abonnement" },
    { value: 'free', label: 'Gratuit' },
    { value: 'buy', label: "A l'achat" },
    { value: 'rent', label: 'A la location' },
    { value: 'ads', label: 'Avec contenu publicitaire' },
  ];

  public userDisplayContent = this.displayContent;
  public orderBySelectValue = 'popularity';
  public userCertificationLte = '0';
  public userPreferences: ApiOptions = {
    sort_by: 'revenue.asc',
    with_watch_monetization_types: 'flatrate|free|ads|rent|buy',
  };

  get watchMonetizationTypes() {
    return this.userPreferences.with_watch_monetization_types?.split('|');
  }

  shouldDisableLastCheckbox(): boolean {
    return this.watchMonetizationTypes?.length === 1;
  }

  setUserOption(field: keyof ApiOptions, value: any, join = false) {
    if (join) {
      value = value.join('|');
    }
    this.userPreferences[field] = value;
  }

  constructor(
    private preferencesService: PreferencesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.preferencesService
      .getUserPreference()
      .subscribe((userPreferences: any) => {
        if (userPreferences) {
          Object.keys(userPreferences).forEach((preference: string) => {
            const value = userPreferences[preference as keyof ApiOptions];
            if (!!value) {
              this.userPreferences[preference as keyof ApiOptions] = value;
            }
          });
        }
      });
  }

  handleSortByChange(value: string) {
    this.setUserOption('sort_by', value);
  }

  setWatchProviders(watchProviders: WatchProvider[]) {
    this.watchProviders = watchProviders;
    this.setUserOption(
      'with_watch_providers',
      watchProviders.map((watchProvider) => watchProvider.provider_id),
      true
    );
  }

  setCertificationLte(certificationLte: string) {
    this.setUserOption('certification_lte', certificationLte);
  }

  setWithoutGenres(withoutGenres: string[]) {
    this.setUserOption('without_genres', withoutGenres, true);
  }

  setReleaseDates(releaseDates: string[]) {
    if (!!releaseDates.length) {
      this.setUserOption('primary_release_date_gte', releaseDates[0]);
      if (releaseDates.length > 1) {
        this.setUserOption('primary_release_date_lte', releaseDates[1]);
      }
    }
  }

  setVoteCountGte(vote: number) {
    this.setUserOption('vote_count_gte', vote);
  }

  setWatchMonetizationTypes(event: any) {
    let value: string[] = [event.source.value];
    if (event.checked) {
      if (!!this.watchMonetizationTypes) {
        value = [...value, ...this.watchMonetizationTypes];
      }
    } else {
      value = this.watchMonetizationTypes?.filter(
        (watchMonetizationType) =>
          String(watchMonetizationType) !== String(value)
      ) as string[];
    }

    this.setUserOption('with_watch_monetization_types', value, true);
  }

  setProductionCountry(event: string[]) {
    this.setUserOption('with_origin_country', event, true);
  }

  setRuntime(event: number[]) {
    this.setUserOption('with_runtime_gte', event[0]);
    this.setUserOption('with_runtime_lte', event[1]);
  }

  setUserSettings() {
    this.preferencesService
      .setUserPreferences(this.userPreferences)
      .subscribe((e: any) => this.router.navigateByUrl('/movies'));
  }
}
