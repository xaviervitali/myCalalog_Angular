import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, CardDialogComponent,],
})
export class CardComponent implements OnInit {
  @Input() media: any;
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() zoom: boolean = true;
  @Input() info: boolean = false;
  @Input() objectFit: string = 'cover';

  @Output() dataLoading = new EventEmitter<boolean>(false)
  public environment = environment;
  constructor(public dialog: MatDialog) {}
  scrollToTop() {
    window.scrollTo(0, 0);
    this
    .dataLoading.emit(true)
  }
  ngOnInit() {}

  openDialog(image: any): void {
    if (this.zoom && (image.profile_path || image.poster_path || image.file_path)) {
      const data = {image : image.profile_path ?? image.poster_path ?? image.file_path, allImages: this.media} 
      const dialogRef = this.dialog.open(CardDialogComponent, {
        disableClose: false,
        data,
        height:'80vh',
        width: '80vw'
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
}
