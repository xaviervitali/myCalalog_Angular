import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

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
})
export class ReleaseDatesComponent {
  readonly date = new FormControl(moment());

  minYear: number = 0;
  maxYear: number = 1;

  chosenYearHandler(event: any, pickerType: string) {
    const selectedYear = event.value.getFullYear();
    if (pickerType === 'min') {
      this.minYear = selectedYear;
      if (this.maxYear < selectedYear) {
        this.maxYear = selectedYear;
      }
    } else if (pickerType === 'max') {
      this.maxYear = selectedYear;
      if (this.minYear > selectedYear) {
        this.minYear = selectedYear;
      }
    }
  }
}
