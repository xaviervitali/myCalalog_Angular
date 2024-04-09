import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SearchMultiResult, SearchMulti } from '../../../_models/search';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
  @Input() results: SearchMultiResult[] = [];
  @Input() path: string = '';
  pageIndex = 0;
  @Input() totalPage: number = 0;
  @Output() moreResults = new EventEmitter<number>();

  getImgPath(result: SearchMultiResult) {
    return (
      environment.apiPosterPath + (result.poster_path ?? result.profile_path)
    );
  }
  getDisplayDate(result: SearchMultiResult) {
    if (result.first_air_date || result.release_date) {
      return moment(result.first_air_date ?? result.release_date).year();
    }
    return null;
  }

  handlePageEvent(event: PageEvent) {
    this.moreResults.emit(event.pageIndex + 1);
    this.pageIndex = event.pageIndex;
  }
}
