import { MovieWatchProvidersComponent } from './../movie/movie-watch-providers/movie-watch-providers.component';
import { MapPipe } from './../../_pipe/map.pipe';
import { environment } from './../../environment/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvShowService } from '../../_services/tv-show.service';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../_shared/overview/overview.component';
import { CastComponent } from '../_shared/cast/cast.component';
import { CrewComponent } from '../_shared/crew/crew.component';
import { NoteComponent } from '../_shared/note/note.component';

@Component({
  selector: 'app-tv-show',
  standalone: true,
  imports: [
    CommonModule,
    MapPipe,
    OverviewComponent,
    MovieWatchProvidersComponent,
    CastComponent,
    CrewComponent,
    NoteComponent,
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
  constructor(
    private route: ActivatedRoute,
    private tvShowService: TvShowService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.tvShowService.getTvShowInfo(+id).subscribe((tvShow) => {
          this.tvShow = tvShow;
          this.watchProviders = tvShow['watch/providers'].results.FR;
          this.cast = tvShow.credits.cast.filter(
            (cast: any) => cast.known_for_department === 'Acting'
          );
          this.producer = tvShow.created_by;
        });
      }
    });
  }
}
