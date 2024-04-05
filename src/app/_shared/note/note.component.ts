import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component, Input } from '@angular/core';
import { RoundPipe } from '../../../_pipe/round.pipe';

@Component({
  selector: 'app-note',
  standalone: true,

  imports: [MatProgressSpinnerModule, RoundPipe, MatTooltipModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  @Input() media: any;
}
