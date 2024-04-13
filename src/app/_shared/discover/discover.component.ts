import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../_pipe/truncate.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TruncatePipe,
    ReactiveFormsModule,
    InfiniteScrollModule,
    HeaderComponent,
  ],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css',
})
export class DiscoverComponent {
  public environment = environment;
  private page = 1;
  public scrollDistance = 1;
  public scrollUpDistance = 2;
  public throttle = 500;

  @Output() scrollDown = new EventEmitter<number>();
  @Input() items: any = [];
  @Input() route: string = '';
  @Input() backgroundImage: string = '';
  @Input() userWatchProviders: any = [];
  onScrollDown() {
    this.page++;
    this.scrollDown.emit(+this.page);
  }
  onScrollUp() {}
}
