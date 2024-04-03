import { Component, OnInit } from '@angular/core';
import { MultiSearchService } from '../../_services/multi-search.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchMulti } from '../../_models/search';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment/environment';
import { TruncatePipe } from '../../_pipe/truncate.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { HeaderComponent } from '../header/header.component';
import { MatListModule } from '@angular/material/list';
import { forkJoin } from 'rxjs';
import { ResultsComponent } from './results/results.component';
@Component({
  selector: 'app-seach-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TruncatePipe,
    HeaderComponent,
    MatListModule,
    ResultsComponent,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  tvs: SearchMulti | { results: []; total_results: 0 } = {
    results: [],
    total_results: 0,
  };
  movies: SearchMulti | { results: []; total_results: 0 } = {
    results: [],
    total_results: 0,
  };
  persons: SearchMulti | { results: []; total_results: 0 } = {
    results: [],
    total_results: 0,
  };

  public environment = environment;
  constructor(
    private multiSearchService: MultiSearchService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const query = params.get('query');

      if (!!query) {
        this.persons =
          this.movies =
          this.persons =
            { results: [], total_results: 0 };
        forkJoin({
          movies: this.multiSearchService.searchMovies(query),
          tv: this.multiSearchService.searchTVs(query),
          persons: this.multiSearchService.searchPersons(query),
        }).subscribe((results) => {
          if (results) {
            this.tvs = results.tv;
            this.movies = results.movies;
            this.persons = results.persons;
          }
        });
      }
    });
  }
}
