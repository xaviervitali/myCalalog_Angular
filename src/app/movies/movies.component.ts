import { Component, OnInit } from '@angular/core';
import { DiscoverMovie } from '../../_models/discover';
import { TruncatePipe } from '../../_pipe/truncate.pipe';
import { CommonModule } from '@angular/common';
import { DiscoverService } from '../../_services/discover.service';
import { environment } from '../../environment/environment';
import { HeaderComponent } from '../_shared/header/header.component';
import { UserService } from '../../_services/user.service';
import { DiscoverComponent } from '../_shared/discover/discover.component';
import { ProductionCountriesComponent } from '../preferences/production-countries/production-countries.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    HeaderComponent,
    DiscoverComponent,
    ProductionCountriesComponent,
  ],
})
export class MoviesComponent implements OnInit {
  public movies: DiscoverMovie[] = [];
  private page = 1;
  private maxPage = 1;
  public userWatchProviders = false;
  constructor(
    private discoverService: DiscoverService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userWatchProviders = !!this.userService.getOption(
      'with_watch_providers'
    );
    if (this.userWatchProviders) {
      this.getDefaultList();
    }
  }

  getDefaultList() {
    this.discoverService.getMovieList(this.page).subscribe((discover) => {
      this.movies = discover.results as DiscoverMovie[];
      this.maxPage = discover.total_pages;
    });
  }

  onScrollDown(page: any) {
    this.page = page;
    if (this.page <= this.maxPage) {
      this.discoverService.getMovieList(this.page).subscribe((discover) => {
        this.movies.push(...(discover.results as DiscoverMovie[]));
      });
    }
  }
}
