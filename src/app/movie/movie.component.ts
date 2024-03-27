import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieDetail, Video } from '../../_models/movie';
import { environment } from '../../environment/environment';
import { GenerateCommaPipe } from '../../_pipe/generate-comma.pipe';
import { forkJoin } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { KebabCasePipe } from '../../_pipe/kebab-case.pipe';
import { MovieService } from '../../_services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  standalone: true,
  imports: [
    CommonModule,
    GenerateCommaPipe,
    MatTooltipModule,
    KebabCasePipe,
    RouterLink,
  ],
})
export class MovieComponent implements OnInit {
  public movie: MovieDetail | null = null;
  public watchProviders: any;
  public videos: any;

  public cast: any[] = [];
  public environment = environment;
  public stars: string[] = [];
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
        }).subscribe((value: any) => {
          this.movie = value.movieDetail;
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
