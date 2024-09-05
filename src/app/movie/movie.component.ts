import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cast, Credits, Crew, MovieDetail } from '../../_models/movie';
import { environment } from '../../environment/environment';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { KebabCasePipe } from '../../_pipe/kebab-case.pipe';
import { MovieService } from '../../_services/movie.service';
import { MapPipe } from '../../_pipe/map.pipe';
import { MinutesToHoursPipe } from '../../_pipe/minutes-to-hours.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CastComponent } from '../_shared/cast/cast.component';
import { MovieWatchProvidersComponent } from './movie-watch-providers/movie-watch-providers.component';
import { MovieVideosComponent } from './movie-videos/movie-videos.component';
import { MovieProductionCompaniesComponent } from './movie-production-companies/movie-production-companies.component';
import { RecommandationsComponent } from '../_shared/recommandations/recommandations.component';
import { OverviewComponent } from '../_shared/overview/overview.component';
import { RoundPipe } from '../../_pipe/round.pipe';
import { NoteComponent } from '../_shared/note/note.component';
import { CardComponent } from '../_shared/card/card.component';
import { ProductionCountriesComponent } from '../_shared/production-countries/production-countries.component';
import { BackgroundService } from '../../_services/background.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    KebabCasePipe,
    RouterLink,
    MapPipe,
    MinutesToHoursPipe,
    MatCardModule,
    CastComponent,
    MovieWatchProvidersComponent,
    MovieVideosComponent,
    MovieProductionCompaniesComponent,
    RecommandationsComponent,
    OverviewComponent,
    NoteComponent,
    CardComponent,
    ProductionCountriesComponent,
    MatProgressSpinnerModule,
  ],
})
export class MovieComponent implements OnInit {
  public movie: MovieDetail | null = null;
  public watchProviders: any;
  public videos: any;
  public age: number = 0;
  public cast: any[] = [];
  public environment = environment;
  public stars: string[] = [];
  public keywords: any[] = [];
  public recommendations: any[] = [];
  public directors: any[] = [];
  public writers: any[] = [];

  private movieId!: number;
  @ViewChild('.word-cloud', { static: true })
  wordCloud!: ElementRef<HTMLCanvasElement>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private backgroundService: BackgroundService
  ) {}

  ngOnInit() {
    this.getMovieInfo();
  }

  castFilter(sourceArray: Cast[] | Crew[], field: string, match: string) {
    return sourceArray.filter((cast: any) => cast[field] === match);
  }

  getMovieInfo() {
    const id = localStorage.getItem('movieId');

    if (!!id) {
      this.movieService.getMovieInfo(+id).subscribe((movieDetail) => {
        console.log('Fetched movie details:', movieDetail);
        this.movie = movieDetail;
        this.backgroundService.setBackgroundImage(
          environment.apiPosterPath + movieDetail.backdrop_path
        );
        const certifications = this.movie.release_dates.results.find(
          (relaeaseDate) => relaeaseDate.iso_3166_1 === 'FR'
        )?.release_dates;
        if (certifications) {
          this.age = Math.max(
            ...certifications.map(
              (certification) => +certification.certification
            )
          );
        }
        this.watchProviders = movieDetail['watch/providers'].results['FR'];
        this.videos = movieDetail.videos.results
          .filter((video) => video.site === 'YouTube')
          .map((video) => ({
            ...video,
            key: this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://www.youtube.com/embed/' + video.key
            ),
          }));
        this.cast = this.castFilter(
          movieDetail.credits.cast,
          'known_for_department',
          'Acting'
        );
        this.directors = this.castFilter(
          movieDetail.credits.crew,
          'job',
          'Director'
        );
        this.writers = this.castFilter(
          movieDetail.credits.crew,
          'job',
          'Screenplay'
        );
        // Non localisé
        // const keywords = value.keywords.keywords;
        // const keywordClasses = ['small', 'large', ''];
        // if (!!keywords.length) {
        //   keywords.forEach((keyword: Keyword) => {
        //     const x = Math.random() > 0.5 ? 'x-' : '';
        //     const keywordClass =
        //       keywordClasses[
        //         Math.floor(Math.random() * keywordClasses.length)
        //       ];
        //     const className = !!keywordClass
        //       ? 'word-cloud__word--' + x + keywordClass
        //       : '';
        //     this.keywords.push({ keyword: keyword.name, className });
        //   });
        // }
        this.recommendations = movieDetail.similar.results.sort(
          (recommandationA, recommandationB) =>
            recommandationB.popularity - recommandationA.popularity
        );
      });
    }
  }
}
