import { Component, Input } from '@angular/core';
import { environment } from '../../../environment/environment';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cast',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.css',
})
export class CastComponent {
  @Input() cast: any[] = [];

  environment = environment;
}
