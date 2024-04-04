import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import localeFr from '@angular/common/locales/fr';
import { ActorService } from '../../_services/actor.service';
import { MovieRecommandationsComponent } from '../_shared/movie-recommandations/movie-recommandations.component';
import moment from 'moment';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [CommonModule, RouterLink, MovieRecommandationsComponent],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class ActorComponent implements OnInit {
  public environment = environment;
  public actor: any = {};
  public credits: any = {};

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService
  ) {
    registerLocaleData(localeFr);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        forkJoin({
          detail: this.actorService.getActorDetail(+id),
          credits: this.actorService.getActorMovieCredits(+id),
        }).subscribe((response) => {
          this.actor = response.detail;
          this.credits = response.credits.cast.sort(
            (a: any, b: any) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
        });
      }
    });
  }
}
