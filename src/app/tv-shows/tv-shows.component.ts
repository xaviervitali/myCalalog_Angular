import { Component } from '@angular/core';
import { DiscoverMovie, DiscoverTV } from '../../_models/discover';
import { DiscoverService } from '../../_services/discover.service';
import { UserService } from '../../_services/user.service';
import { DiscoverComponent } from '../_shared/discover/discover.component';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [DiscoverComponent],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.css',
})
export class TvShowsComponent {
  public tvs: DiscoverTV[] = [];
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
    this.discoverService.getTVShowList(this.page).subscribe((discover) => {
      this.tvs = discover.results as DiscoverTV[];
      this.maxPage = discover.total_pages;
    });
  }

  onScrollDown(page: any) {
    this.page = page;
    if (this.page <= this.maxPage) {
      this.discoverService.getTVShowList(this.page).subscribe((discover) => {
        this.tvs.push(...(discover.results as DiscoverTV[]));
      });
    }
  }
}
