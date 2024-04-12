import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component, Input } from '@angular/core';
import { RoundPipe } from '../../../_pipe/round.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,

  imports: [
    MatProgressSpinnerModule,
    RoundPipe,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  @Input() media: any;
}
