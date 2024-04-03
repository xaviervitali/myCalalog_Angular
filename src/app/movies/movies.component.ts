import { Component, OnInit } from '@angular/core';
import { DiscoverMovie } from '../../_models/discover';
import { TruncatePipe } from '../../_pipe/truncate.pipe';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DiscoverService } from '../../_services/discover.service';
import { environment } from '../../environment/environment';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TruncatePipe,
    ReactiveFormsModule,
    InfiniteScrollModule,
    HeaderComponent,
  ],
})
export class MoviesComponent implements OnInit {
  public movieList: DiscoverMovie[] = [];
  public environment = environment;
  public searchMovieName: string = '';
  private page = 1;
  private maxPage = 1;
  public scrollDistance = 1;
  public scrollUpDistance = 2;
  public throttle = 500;
  public userWatchProviders = false;
  public movieSearch = new FormGroup({
    name: new FormControl(this.searchMovieName),
  });
  private defaultList: DiscoverMovie[] = [];
  private defaultMaxPage = 1;
  constructor(
    private discoverService: DiscoverService,
    private userService: UserService
  ) {
    this.movieList = this.defaultList;
    this.maxPage = this.defaultMaxPage;
  }

  ngOnInit(): void {
    this.userWatchProviders = !!this.userService.getOption(
      'with_watch_providers'
    );
    if (this.userWatchProviders) {
      this.getDefaultList();
    }
  }

  getDefaultList() {
    if (this.defaultList.length === 0) {
      this.discoverService.getMovieList(this.page).subscribe((discover) => {
        this.movieList = this.defaultList = discover.results;
        this.defaultMaxPage = this.maxPage = discover.total_pages;
      });
    }
  }

  onScrollDown() {
    this.page++;
    if (this.page <= this.maxPage) {
      this.discoverService.getMovieList(this.page).subscribe((discover) => {
        this.movieList.push(...discover.results);
      });
    }
  }

  onUp() {}
}
