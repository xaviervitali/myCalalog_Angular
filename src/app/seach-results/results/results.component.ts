import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SearchMltiResult, SearchMulti } from '../../../_models/search';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatPaginatorModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  public environment = environment;
  @Input() results: SearchMulti | { results: []; total_pages: 0 } = {
    results: [],
    total_pages: 0,
  };
}
