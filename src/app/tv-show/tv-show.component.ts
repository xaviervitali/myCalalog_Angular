import { MovieWatchProvidersComponent } from './../movie/movie-watch-providers/movie-watch-providers.component';
import { MapPipe } from './../../_pipe/map.pipe';
import { environment } from './../../environment/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvShowService } from '../../_services/tv-show.service';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../_shared/overview/overview.component';
import { CastComponent } from '../_shared/cast/cast.component';
import { CardComponent } from '../_shared/card/card.component';
import { NoteComponent } from '../_shared/note/note.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-tv-show',
  standalone: true,
  imports: [
    CommonModule,
    MapPipe,
    OverviewComponent,
    MovieWatchProvidersComponent,
    CastComponent,
    CardComponent,
    NoteComponent,
    MatAccordion,
    MatExpansionModule,
  ],
  templateUrl: './tv-show.component.html',
  styleUrl: './tv-show.component.css',
})
export class TvShowComponent implements OnInit {
  environment = environment;
  public watchProviders: any;
  public tvShow: any;
  public cast: any;
  public producer: any;
  public seasons: any[] = [];
  public background!: string;
  constructor(
    private route: ActivatedRoute,
    private tvShowService: TvShowService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        // this.tvShowService.getTvShowInfo(+id).subscribe((tvShow) => {
        // if (id) {
        //   this.tvShowService
        //     .getSeasonsDetail(+id, tvShow.number_of_seasons)
        //     .subscribe((seasons) => (this.seasons = seasons.seasons));
        // }
        //   this.tvShow = tvShow;
        //   this.background = environment.apiPosterPath + tvShow.backdrop_path
        //   this.watchProviders = tvShow['watch/providers'].results.FR;
        //   this.cast = tvShow.credits.cast.filter(
        //     (cast: any) => cast.known_for_department === 'Acting'
        //   );
        //   this.producer = tvShow.created_by;
        // });
      }
    });
  }
}
