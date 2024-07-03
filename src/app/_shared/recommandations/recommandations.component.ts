import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environment/environment';
import { MediaTypePipe } from '../../../_pipe/media-type.pipe';

@Component({
  selector: 'app-recommandations',
  standalone: true,
  imports: [MediaTypePipe, CommonModule, RouterLink ],
  templateUrl: './recommandations.component.html',
  styleUrl: './recommandations.component.css',
})
export class RecommandationsComponent {
  environment = environment;
  @Input() recommendations: any;
  @Input() title: string = 'Similaire à';
}
