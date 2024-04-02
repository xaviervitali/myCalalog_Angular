import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../_services/preferences.service';
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
import { WatchProviderResult } from '../../_models/watch_providers';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MinutesToHoursPipe } from '../../_pipe/minutes-to-hours.pipe';
import { HeaderComponent } from '../header/header.component';

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
    MatRadioModule,
    MinutesToHoursPipe,
    HeaderComponent,
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css',
  providers: [provideNativeDateAdapter(MY_FORMATS), MinutesToHoursPipe],
})
export class PreferencesComponent implements OnInit {
  public includeAdult = !!this.userService.getOption('include_adult');

  public withoutGenres: GenreResults[] = [];
  public watchProviders: WatchProviderResult[] = [];

  public toto = `Pictogramme signalétique -10 ans

  Lorsqu’un programme (série, film, documentaire, etc.) comporte des scènes qui risquent de choquer les plus jeunes ou abordent des sujets risquant de les perturber, le pictogramme -10 est affiché. Ces programmes peuvent être diffusés en journée, s’ils ne sont pas programmés à l’intérieur des émissions jeunesse.
  
  Pictogramme signalétique -12 ans
  Le pictogramme -12 permet de repérer les programmes comportant de la violence physique et/ou psychologique de façon répétée ou des scènes relatives à la sexualité des adultes. Les programmes risquant de perturber les repères des enfants de moins de 12 ans de manière plus générale sont également concernés. 
  
  Ils ne peuvent être diffusés qu’à partir de 22 h (ou 20 h 30 sur les chaînes cinéma ou de paiement à la demande).
  
  Pictogramme signalétique -16 ans
  Le pictogramme -16 concerne essentiellement les programmes érotiques ou ceux comportant des scènes de grande violence. Ils ne peuvent être diffusés qu’à partir de 22 h 30. Les chaînes cinéma, de paiement à la demande ou les plateformes de streaming vidéo (comme Netflix ou Amazon Video Prime) sont soumises à un régime différent.
  
  Pictogramme signalétique -18 ans
  Enfin, les films ou programmes interdits aux moins de 18 ans sont ceux d’ordre pornographique ou de très grande violence réservés à un public adulte averti. Ils ne peuvent être diffusés qu’entre minuit et 5 h du matin.`;
  public formGroup = this.formBuilder.group({
    includeAdult: this.formBuilder.control(this.includeAdult),
    releaseDates: this.formBuilder.group({
      start: 1895,
      end: moment().year(),
    }),
    runtime: this.formBuilder.group({
      start: 0,
      end: 300,
    }),
    selectedAge: this.formBuilder.control('0'),
  });

  public apiPosterPath = environment.apiPosterPath;
  sortOrder: 'asc' | 'desc' = 'desc'; // Ordre de tri par défaut

  public orderBySelectValue = 'popularity';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private minutesToHoursPipe: MinutesToHoursPipe
  ) {}

  ngOnInit(): void {
    // order_by
    const orderBy = this.userService.getOption('order_by', '.') as string[];
    if (!!orderBy?.length) {
      this.orderBySelectValue = orderBy[0];
    }
  }

  handleAdultContentCheckbox(event: any) {
    const isChecked = event.checked;
    const optionName = 'include_adult';
    if (isChecked) {
      this.userService.setOption(optionName, true);
    } else {
      this.userService.removeOption(optionName);
    }
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Inversion de l'ordre de tri
    let orderBy = this.userService.getOption('order_by', '.') as string[];
    if (!!orderBy?.length) {
      this.userService.setOption('order_by', orderBy[0] + '.' + this.sortOrder);
    }
  }

  handleOrderByChange(event: any) {
    this.userService.setOption('order_by', event + '.' + this.sortOrder);
  }

  chosenMonthHandler(
    normalizedMonth: Moment | null,
    datepicker: MatDatepicker<Moment> | null,
    formControlName: string
  ) {
    const form = this.formGroup.get(formControlName);
    if (form) {
      if (normalizedMonth) {
        form.setValue(normalizedMonth);
      } else {
        form.setValue('');
      }

      if (datepicker != null) datepicker.close();
    }
  }

  inputChosenMonthHandler(normalizedMonth: string, formControlName: string) {
    if (normalizedMonth) {
      this.chosenMonthHandler(
        moment(normalizedMonth, ['MMM YYYY', 'MM YYYY']),
        null,
        formControlName
      );
    } else {
      this.chosenMonthHandler(null, null, formControlName);
    }
  }

  setWithoutGenres(genres: GenreResults[]) {
    this.withoutGenres = genres;
  }

  setWatchProviders(watchProviders: WatchProviderResult[]) {
    this.watchProviders = watchProviders;
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  handleAgeLimitChange(event: MatRadioChange) {
    const value = event.value;
    if (!!event.value) {
      this.userService.setOption('certification.lte', value);
    } else {
      this.userService.removeOption('certification.lte');
    }
  }

  handleReleaseDatesChanges() {
    if (
      this.formGroup.value.releaseDates?.start &&
      this.formGroup.value.releaseDates?.end
    ) {
      this.userService.setOption(
        'release_date.gte',
        String(this.formGroup.value.releaseDates.start)
      );
      this.userService.setOption(
        'release_date.lte',
        String(this.formGroup.value.releaseDates.end)
      );
    }
  }
  handleRuntimeChanges() {
    if (
      this.formGroup.value.runtime?.start &&
      this.formGroup.value.runtime?.end
    ) {
      this.userService.setOption(
        'with_runtime.gte',
        this.formGroup.value.runtime.start
      );
      this.userService.setOption(
        'with_runtime.lte',
        this.formGroup.value.runtime.end
      );
    }
  }
  runtimeLabel() {
    if (
      (!!this.formGroup.value.runtime?.start ||
        this.formGroup.value.runtime?.start === 0) &&
      !!this.formGroup.value.runtime?.end
    ) {
      return (
        this.minutesToHoursPipe.transform(+this.formGroup.value.runtime.start) +
        ' et ' +
        this.minutesToHoursPipe.transform(+this.formGroup.value.runtime.end)
      );
    }
    return '';
  }
}
