import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../../environment/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './card-dialog.component.html',
  styleUrl: './card-dialog.component.css',
})
export class CardDialogComponent implements OnInit {
  environment = environment;
  allImages: string[] = [];
  currentImageIndex = 0;
  dataImageIndex = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.allImages = this.data.allImages.map((e: any) => {
      if (e.hasOwnProperty('profile_path')) {
        return e.profile_path;
      }
      if (e.hasOwnProperty('poster_path')) {
        return e.poster_path;
      }
      if (e.hasOwnProperty('file_path')) {
        return e.file_path;
      }
    });
    
    this.currentImageIndex =   this.dataImageIndex = this.allImages.findIndex(
      (e) => e === this.data.image
    );
  }

  handleClick(iterator: string) {
    if (iterator === 'add') {
      this.currentImageIndex++;
      if (this.currentImageIndex === this.allImages.length ) {
        this.currentImageIndex = 0;
      }
    }

    if (iterator === 'minus') {
      this.currentImageIndex--;
      if (this.currentImageIndex < 0) {
        this.currentImageIndex = this.allImages.length -1 ;
      }
    }
  }
}
