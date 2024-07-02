import { Component, OnInit } from '@angular/core';
import { MultiSearchService } from '../../_services/multi-search.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchMulti, SearchMultiResult } from '../../_models/search';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment/environment';
import { HeaderComponent } from '../_shared/header/header.component';
import { MatListModule } from '@angular/material/list';
import { ResultsComponent } from './results/results.component';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-seach-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    MatListModule,
    ResultsComponent,
    MatTabsModule,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  tvs: SearchMulti | null = null;
  movies: SearchMulti | null = null;
  persons: SearchMulti | null = null;

  tvs_showed: SearchMultiResult[] = [];
  movies_showed: SearchMultiResult[] = [];
  persons_showed: SearchMultiResult[] = [];
  query = '';
  public environment = environment;
  constructor(
    private multiSearchService: MultiSearchService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const query = params.get('query');
      if (!!query) {
        this.query = query;
        this.persons = this.movies = this.persons = null;
        this.getMoviesResults();
        this.getTVSResults();
        this.getPersonsResults();
      }
    });
  }

  getMoviesResults(page = 1) {
    if (!this.query) return;
    console.log(page - 1);
    if (this.movies && this.movies.results.length > (page - 1) * 20) {
      this.movies_showed = this.sliceResults(this.movies.results, page - 1);
      return;
    }

    // this.multiSearchService
    //   .searchMovies(this.query, page)
    //   .subscribe((movies) => {
    //     if (!this.movies) {
    //       this.movies = movies;
    //     } else {
    //       this.movies.results.push(...(movies?.results ?? []));
    //     }
    //     this.movies_showed = this.sliceResults(
    //       this.movies?.results ?? [],
    //       page - 1
    //     );
    //   });
  }
  getTVSResults(page = 1) {
    if (!this.query) return;

    if (this.tvs && this.tvs.results.length > page * 20) {
      this.tvs_showed = this.sliceResults(this.tvs.results, page - 1);
      return;
    }

    // this.multiSearchService.searchTVs(this.query, page).subscribe((tvs) => {
    //   if (!this.tvs) {
    //     this.tvs = tvs;
    //   } else {
    //     this.tvs.results.push(...(tvs?.results ?? []));
    //   }
    //   this.tvs_showed = this.sliceResults(this.tvs?.results ?? [], page - 1);
    // });
  }

  getPersonsResults(page = 1) {
    if (!this.query) return;

    if (this.persons && this.persons.results.length > page * 20) {
      this.persons_showed = this.sliceResults(this.persons.results, page - 1);
      return;
    }

    // this.multiSearchService
    //   .searchPersons(this.query, page)
    //   .subscribe((persons) => {
    //     if (!this.persons) {
    //       this.persons = persons;
    //     } else {
    //       this.persons.results.push(...(persons?.results ?? []));
    //     }
    //     this.persons_showed = this.sliceResults(
    //       this.persons?.results ?? [],
    //       page - 1
    //     );
    //   });
  }

  sliceResults(results: SearchMultiResult[], page: number) {
    return results.slice(page * 20, page * 20 + 20);
  }
}
