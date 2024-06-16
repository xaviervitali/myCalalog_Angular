import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Country } from '../../../../_models/country';

@Component({
  selector: 'app-production-country-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './production-country-dialog.component.html',
  styleUrl: './production-country-dialog.component.css',
})
export class ProductionCountryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductionCountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Country
  ) {}
}
