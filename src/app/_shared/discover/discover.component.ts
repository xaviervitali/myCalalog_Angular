import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TruncateByWordsCountPipe } from '../../../_pipe/truncateByWordsCount.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { DiscoverSettingsDialogComponent } from './discover-settings-dialog/discover-settings-dialog.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TruncateByWordsCountPipe,
    ReactiveFormsModule,
    InfiniteScrollModule,
    HeaderComponent,

    MatSidenavModule,
    MatButtonModule,

    MatMenuModule,
  ],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css',
})
export class DiscoverComponent {
  public environment = environment;
  private page = 1;
  public throttle = 500;
  public drawerText = 'Afficher';
  showFiller = false;
  @Output() scrollDown = new EventEmitter<number>();
  @Input() items: any = [];
  @Input() route: string = '';
  @Input() backgroundImage: string = '';
  @Input() userWatchProviders: any = [];

  constructor(public dialog: MatDialog) {}
  onScrollDown() {
    this.page++;
    this.scrollDown.emit(+this.page);
  }

  handleDrawerChange(event: any) {
    this.drawerText = event.opened ? 'Masquer' : 'Afficher';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DiscoverSettingsDialogComponent, {
      maxWidth: 800,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
