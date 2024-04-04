import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SearchMltiResult, SearchMulti } from '../../../_models/search';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { MatPaginatorModule } from '@angular/material/paginator';
import moment from 'moment';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatPaginatorModule, RouterLink],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  public environment = environment;
  @Input() results: any;
  @Input() path: string = '';
  getImgPath(result: any) {
    return (
      environment.apiPosterPath + (result.poster_path ?? result.profile_path)
    );
  }
  getDisplayDate(result: any) {
    if (result.first_air_date || result.release_date) {
      return moment(result.first_air_date ?? result.release_date).year();
    }
    return null;
  }
}
