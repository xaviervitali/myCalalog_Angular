import { Component } from '@angular/core';
import { CertificationComponent } from '../../../preferences/certification/certification.component';
import { SortComponent } from '../../../preferences/sort/sort.component';
import { GenresComponent } from '../../../preferences/genres/genres.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-discover-settings-dialog',
  standalone: true,
  imports: [
    CertificationComponent,
    SortComponent,
    GenresComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './discover-settings-dialog.component.html',
  styleUrl: './discover-settings-dialog.component.css',
})
export class DiscoverSettingsDialogComponent {}
