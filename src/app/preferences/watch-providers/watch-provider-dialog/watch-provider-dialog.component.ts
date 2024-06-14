import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { WatchProvider } from '../../../../_models/watch_providers';

@Component({
  selector: 'app-watch-provider-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './watch-provider-dialog.component.html',
  styleUrl: './watch-provider-dialog.component.css',
})
export class WatchProviderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WatchProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WatchProvider
  ) {}
}
