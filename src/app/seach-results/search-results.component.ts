import { Component, OnInit } from '@angular/core';
import { MultiSearchService } from '../../_services/multi-search.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchMltiResult, SearchMulti } from '../../_models/search';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment/environment';
import { TruncatePipe } from '../../_pipe/truncate.pipe';

@Component({
  selector: 'app-seach-results',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  tv: SearchMltiResult[] = [];
  movie: SearchMltiResult[] = [];
  person: SearchMltiResult[] = [];
  public environment = environment;
  constructor(
    private multiSearchService: MultiSearchService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const query = params.get('query');
      if (!!query) {
        this.tv = this.movie = this.person = [];
        this.multiSearchService.multiSearch(query).subscribe((results) => {
          if (results) {
            results.results.forEach((result) => {
              const cat = result.media_type;
              this[cat].push(result as SearchMltiResult);
            });
          }
        });
      }
    });
  }
}
