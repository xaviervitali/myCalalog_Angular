import { environment } from '../../../environment/environment';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class CardComponent implements OnInit {
  @Input() media: any;
  @Input() title: string = '';
  @Input() path: string = 'actor';
  public environment = environment;
  constructor() {}
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  ngOnInit() {}
}
