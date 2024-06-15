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

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CertificationComponent } from './certification/certification.component';
import { SortComponent } from './sort/sort.component';
import { MOVIE_GENRES } from '../../_const/movieGenres';
import { TV_SHOW_GENRES } from '../../_const/tvShowGenres';
import { PreferencesService } from '../../_services/preferences.service';
import { ApiOptions } from '../../_models/apiOptions';

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
    MatSliderModule,
    MinutesToHoursPipe,
    HeaderComponent,
    MatInputModule,
    ProductionCountriesComponent,
    CertificationComponent,
    SortComponent,
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css',
  providers: [provideNativeDateAdapter(MY_FORMATS), MinutesToHoursPipe],
})
export class PreferencesComponent implements OnInit {
  public includeAdult = !!this.userService.getOption('include_adult');
  public movieGenres = MOVIE_GENRES;
  public tvShowGenres = TV_SHOW_GENRES;

  public withoutGenres: GenreResults[] = [];
  public watchProviders: WatchProvider[] = [];
  public countries: string[] = [];
  public maxYear = moment().year();
  public formGroup = this.formBuilder.group({
    includeAdult: this.formBuilder.control(this.includeAdult),
    releaseDates: this.formBuilder.group({
      start: 1895,
      end: this.maxYear,
    }),
    runtime: this.formBuilder.group({
      start: 0,
      end: 300,
    }),
    selectedAge: this.formBuilder.control('0'),
    voteCountGte: this.formBuilder.control(0),
  });

  public apiPosterPath = environment.apiPosterPath;
  public voteCountGte = 0;
  public displayContent = [
    { value: 'flatrate', label: "Inclus dans l'abonnment" },
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
    with_watch_monetization_types: "flatrate|free|ads|rent|buy"
  };

  get watchMonetizationTypes(){
    return this.userPreferences.with_watch_monetization_types?.split('|')
  }


  shouldDisableLastCheckbox(): boolean {
    return this.watchMonetizationTypes?.length === 1;
  }

  setUserOption(field: keyof ApiOptions, value:any, join = false){
    if(join){
      value = value.join('|')
    }
    this.userPreferences[field] = value

  }


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private preferencesService: PreferencesService
  ) {}

  ngOnInit(): void {
    this.preferencesService.getUserPreference().subscribe((userPreferences) => {
      if (userPreferences) {
        Object.keys(userPreferences).forEach((preference: string) => {
          const value = userPreferences[preference as keyof ApiOptions];
          if (!!value) {
            this.userPreferences[preference as  keyof ApiOptions] = value;
          }
        });
      }
    });

    // this.formGroup.controls.voteCountGte.valueChanges
    //   .pipe(
    //     debounceTime(300) // Délai de debounce en millisecondes
    //   )
    //   .subscribe((inputValue) => {
    //     if (!!inputValue) {
    //      // this.userService.setOption('vote_count.gte', +inputValue);
    //     } else {
    //       this.userService.removeOption('vote_count.gte');
    //     }
    //   });
    // this.setUserSettings();
  }

  handleSortByChange(value: string) {

    this.setUserOption('sort_by', value)
  }
  // handleAdultContentCheckbox(event: any) {
  //   const isChecked = event.checked;
  //   const optionName = 'include_adult';
  //   if (isChecked) {
  //     this.userService.setOption(optionName, true);
  //   } else {
  //     this.userService.removeOption(optionName);
  //   }
  // }

  // chosenMonthHandler(
  //   normalizedMonth: Moment | null,
  //   datepicker: MatDatepicker<Moment> | null,
  //   formControlName: string
  // ) {
  //   const form = this.formGroup.get(formControlName);
  //   if (form) {
  //     if (normalizedMonth) {
  //       form.setValue(normalizedMonth);
  //     } else {
  //       form.setValue('');
  //     }

  //     if (datepicker != null) datepicker.close();
  //   }
  // }

  // inputChosenMonthHandler(normalizedMonth: string, formControlName: string) {
  //   if (normalizedMonth) {
  //     this.chosenMonthHandler(
  //       moment(normalizedMonth, ['MMM YYYY', 'MM YYYY']),
  //       null,
  //       formControlName
  //     );
  //   } else {
  //     this.chosenMonthHandler(null, null, formControlName);
  //   }
  // }

  // setWithoutGenres(genres: GenreResults[]) {
  //   this.withoutGenres = genres;
  // }

  setWatchProviders(watchProviders: WatchProvider[]) {
    this.watchProviders = watchProviders;
    this.setUserOption('with_watch_providers', watchProviders.map(watchProvider=>watchProvider.provider_id), true)
  }

  setCertificationLte(certificationLte:string){
    this.setUserOption('certification_lte', certificationLte)
  }

  // setCountries(countries: string[]) {
  //   this.countries = countries;
  // }
  // formatLabel(value: number): string {
  //   return `${value}`;
  // }

  // handleReleaseDatesChanges() {
  //   if (
  //     this.formGroup.value.releaseDates?.start &&
  //     this.formGroup.value.releaseDates?.end
  //   ) {
  //     this.userService.setOption(
  //       'primary_release_date.gte',
  //       this.formatYearToDate(this.formGroup.value.releaseDates.start)
  //     );
  //     this.userService.setOption(
  //       'first_air_date.gte',
  //       this.formatYearToDate(this.formGroup.value.releaseDates.start)
  //     );
  //     this.userService.setOption(
  //       'primary_release_date.lte',
  //       this.formatYearToDate(this.formGroup.value.releaseDates.end)
  //     );
  //     this.userService.setOption(
  //       'first_air_date.lte',
  //       this.formatYearToDate(this.formGroup.value.releaseDates.end)
  //     );
  //   }
  // }
  // handleRuntimeChanges() {
  //   if (
  //     (this.formGroup.value.runtime?.start ||
  //       this.formGroup.value.runtime?.start == 0) &&
  //     (this.formGroup.value.runtime?.end ||
  //       this.formGroup.value.runtime?.end == 0)
  //   ) {
  //     this.userService.setOption(
  //       'with_runtime.gte',
  //       this.formGroup.value.runtime.start
  //     );
  //     this.userService.setOption(
  //       'with_runtime.lte',
  //       this.formGroup.value.runtime.end
  //     );
  //   }
  // }
  // runtimeLabel() {
  //   if (
  //     (!!this.formGroup.value.runtime?.start ||
  //       this.formGroup.value.runtime?.start === 0) &&
  //     !!this.formGroup.value.runtime?.end
  //   ) {
  //     return (
  //       this.minutesToHoursPipe.transform(+this.formGroup.value.runtime.start) +
  //       ' et ' +
  //       this.minutesToHoursPipe.transform(+this.formGroup.value.runtime.end)
  //     );
  //   }
  //   return '';
  // }

  setWatchMonetizationTypes(event: any) {
    let value:string[] = [event.source.value]
    if (event.checked) {

      if(!!this.watchMonetizationTypes){
        value =  [...value, ...this.watchMonetizationTypes]
      }

    }else{
      value = this.watchMonetizationTypes?.filter(watchMonetizationType=>String(watchMonetizationType) !== String(value)) as string[]
    }

    this.setUserOption('with_watch_monetization_types', value, true)
  }

  // setUserSettings() {
  //   // order_by

  //   // vote_count.gte
  //   const voteCountGte = this.userService.getOption('vote_count.gte');
  //   if (!!voteCountGte) {
  //     this.voteCountGte = +voteCountGte;
  //   }
  //   // with_watch_monetization_types
  //   const userDisplayContent = this.userService.getOption(
  //     'with_watch_monetization_types',
  //     '|'
  //   ) as string[];
  //   let userDisplay: any[] = [];
  //   if (!!userDisplayContent && !!userDisplayContent.length) {
  //     userDisplayContent.forEach((content: any) => {
  //       userDisplay.push(
  //         this.displayContent.find(
  //           (displayContent) => displayContent.value === content
  //         )
  //       );
  //     });
  //     this.userDisplayContent = userDisplay;
  //   }

  //   // certification.lte
  //   const certificationLte = this.userService.getOption('certification.lte');
  //   if (!!certificationLte) {
  //     this.userCertificationLte = certificationLte as string;
  //   }

  //   //with_runtime
  //   const withRunTimeLte = this.userService.getOption('with_runtime.lte');
  //   const withRunTimeGte = this.userService.getOption('with_runtime.gte');
  //   if (
  //     (!!withRunTimeLte || withRunTimeLte == 0) &&
  //     (!!withRunTimeGte || withRunTimeGte == 0)
  //   ) {
  //     this.formGroup.controls.runtime.controls.start.setValue(+withRunTimeGte);
  //     this.formGroup.controls.runtime.controls.end.setValue(+withRunTimeLte);
  //   }

  //   //with_release_date
  //   const releaseDateLte = this.userService.getOption('release_date.lte');
  //   const releaseDateGte = this.userService.getOption('release_date.gte');
  //   if (!!releaseDateLte && releaseDateGte) {
  //     this.formGroup.controls.releaseDates.controls.start.setValue(
  //       moment(releaseDateGte).year()
  //     );
  //     this.formGroup.controls.releaseDates.controls.end.setValue(
  //       moment(releaseDateLte).year()
  //     );
  //   }
  // }

  // formatYearToDate(year: number) {
  //   return moment(year, 'YYYY').format('YYYY-MM-DD');
  // }



  handleSubmit(){

  }
}
