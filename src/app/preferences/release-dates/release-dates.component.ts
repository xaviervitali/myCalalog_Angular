import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatMomentDateModule,
  provideMomentDateAdapter,
} from '@angular/material-moment-adapter';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import moment, { Moment } from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-release-dates',
  standalone: true,
  templateUrl: './release-dates.component.html',
  styleUrl: './release-dates.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),
  ],
})
export class ReleaseDatesComponent implements OnInit, OnChanges {
  minYearControl = new FormControl();
  maxYearControl = new FormControl(moment());

  minYear!: number;
  maxYear!: number;
  maxDate: Date = new Date();
  minDate = moment('1920', 'YYYY');

  @Input() userReleaseDateGte!: string;
  @Input() userReleaseDateLte!: string;

  @Output() userReleaseDateEmitter = new EventEmitter<string[]>();

  ngOnInit(): void {
    this.setFields();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userReleaseDateGte'] || changes['userReleaseDateLte']) {
      this.setFields();
    }
    if (changes['minYear']) {
      console.log(changes['minYear'].currentValue);
    }
  }

  setFields() {
    if (!!this.userReleaseDateGte) {
      this.minYearControl.setValue(moment(this.userReleaseDateGte));
    }
    if (!!this.userReleaseDateLte) {
      this.maxYearControl.setValue(moment(this.userReleaseDateLte));
    }
  }

  chosenYearHandler(
    event: any,
    pickerType: string,
    datepicker: MatDatepicker<any>
  ) {
    const selectedYear = moment(new Date(event.year(), 0, 1));
    if (pickerType === 'min') {
      this.minYearControl.setValue(selectedYear);
      if (
        !!this.maxYearControl.value &&
        this.maxYearControl.value < selectedYear
      ) {
        this.maxYearControl.setValue(selectedYear);
      }
    } else if (pickerType === 'max') {
      this.maxYearControl.setValue(selectedYear);
      if (
        !!this.minYearControl.value &&
        this.minYearControl.value > selectedYear
      ) {
        this.minYearControl.setValue(selectedYear);
      }
    }

    this.emit();
    datepicker.close();
  }

  emit() {
    let minValue = this.minYearControl.value;
    if (!minValue) {
      minValue = moment(new Date(1900, 0, 1));
    }
    this.userReleaseDateEmitter.emit([
      minValue.format('YYYY-MM-DD'),
      this.maxYearControl?.value?.format('YYYY-MM-DD'),
    ]);
  }
}
