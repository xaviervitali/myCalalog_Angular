import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieDetail, Video } from '../../_models/movie';
import { environment } from '../../environment/environment';
import { forkJoin } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { KebabCasePipe } from '../../_pipe/kebab-case.pipe';
import { MovieService } from '../../_services/movie.service';
import { MapPipe } from '../../_pipe/map.pipe';
import { MinutesToHoursPipe } from '../../_pipe/minutes-to-hours.pipe';
import { MatCardModule } from '@angular/material/card';
import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MovieCastComponent } from './movie-cast/movie-cast.component';
import { MovieWatchProvidersComponent } from './movie-watch-providers/movie-watch-providers.component';
import { MovieVideosComponent } from './movie-videos/movie-videos.component';
import { MovieProductionCompaniesComponent } from './movie-production-companies/movie-production-companies.component';
import { MovieRecommandationsComponent } from './movie-recommandations/movie-recommandations.component';
import { MovieOverviewComponent } from './movie-overview/movie-overview.component';
import { RoundPipe } from '../../_pipe/round.pipe';

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
    MatProgressSpinnerModule,
    MovieCastComponent,
    MovieWatchProvidersComponent,
    MovieVideosComponent,
    MovieProductionCompaniesComponent,
    MovieRecommandationsComponent,
    MovieOverviewComponent,
    RoundPipe,
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
  @ViewChild('.word-cloud', { static: true })
  wordCloud!: ElementRef<HTMLCanvasElement>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        forkJoin({
          movieDetail: this.movieService.getMovieInfo(+id),
          videos: this.movieService.getMovieVideos(+id),
          watchProviders: this.movieService.getMovieWatchProviders(+id),
          credits: this.movieService.getMovieCast(+id),
          // non localisé
          //   keywords: this.movieService.getMovieKeywords(+id),
          recommendations: this.movieService.getMovieRecommendations(+id),
        }).subscribe((value: any) => {
          this.movie = value.movieDetail;
          const certifications = this.movie?.release_dates.results.find(
            (relaeaseDate) => relaeaseDate.iso_3166_1 === 'FR'
          )?.release_dates;
          if (certifications) {
            this.age = Math.max(
              ...certifications.map(
                (certification) => +certification.certification
              )
            );
          }

          this.watchProviders = value.watchProviders?.results.FR;

          this.videos = value.videos.results
            .filter((video: Video) => video.site === 'YouTube')
            .map((video: Video) => ({
              ...video,
              key: this.sanitizer.bypassSecurityTrustResourceUrl(
                'https://www.youtube.com/embed/' + video.key
              ),
            }));

          this.cast = value.credits.cast.filter(
            (member: any) => member.known_for_department === 'Acting'
          );
          if (this.movie?.vote_average) {
            this.generateStars(+this.movie?.vote_average / 2);
          }
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

          this.recommendations = value.recommendations.results;
        });
      }
    });
  }

  generateStars(rating: number): void {
    this.stars = [];
    const fullStars = Math.floor(rating); // Nombre d'étoiles pleines
    const halfStar = rating - fullStars >= 0.5; // Vérifie s'il y a une demi-étoile

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        this.stars.push('bi bi-star-fill');
      } else if (i === fullStars + 1 && halfStar) {
        this.stars.push('bi bi-star-half');
      } else {
        this.stars.push('bi bi-star');
      }
    }
  }
}
