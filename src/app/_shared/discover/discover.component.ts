import {
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
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
import { MatMenuModule } from '@angular/material/menu';
import { DiscoverSettingsDialogComponent } from './discover-settings-dialog/discover-settings-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { MatChipsModule } from '@angular/material/chips';
import { GenrePipe } from '../../../_pipe/genre.pipe';
import { AuthService } from '../../../_services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

registerLocaleData(localeFr, 'fr');

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
    MatChipsModule,
    MatSidenavModule,
    MatButtonModule,
    GenrePipe,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
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
  public isAuthenticated: boolean = this.auth.isAuthenticated();
  @Output() scrollDown = new EventEmitter<number>();
  @Input() items: any = [];
  @Input() route: string = '';
  @Input() backgroundImage: string = '';
  @Input() userWatchProviders: any = [];
  @Input() genres: any;
  @Input() isLoading: boolean = true;

  constructor(public dialog: MatDialog, private auth: AuthService) {}
  onScrollDown() {
    if (this.isAuthenticated) {
      this.page++;
      this.scrollDown.emit(+this.page);
    }
  }

  handleDrawerChange(event: any) {
    this.drawerText = event.opened ? 'Masquer' : 'Afficher';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DiscoverSettingsDialogComponent, {
      maxWidth: 800,
      disableClose: true,
      data: this.genres,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log();
    });
  }
}
