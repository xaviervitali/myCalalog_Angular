import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import localeFr from '@angular/common/locales/fr';
import { ActorService } from '../../_services/actor.service';
import { RecommandationsComponent } from '../_shared/recommandations/recommandations.component';
import moment from 'moment';
import { CardComponent } from '../_shared/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [CommonModule, RouterLink, RecommandationsComponent, CardComponent, MatProgressSpinnerModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class ActorComponent implements OnInit {
  public environment = environment;
  public actor: any = {};
  public credits: any = {};
  public contentLoading = true
  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService
  ) {
    registerLocaleData(localeFr);
  }
get age(){
  const max  = this.actor.deathday ? moment(this.actor.deathday) : moment().toISOString()

  return  moment(max ).diff(this.actor.birthday
,  'years')
}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
         this.actorService.getCastDetail(+id)
        .subscribe((response) => {
       this.contentLoading = false
          this.actor = response;
          this.credits = response.combined_credits.cast.sort(
            (a: any, b: any) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
   
        });
      }
    });
  }
}
