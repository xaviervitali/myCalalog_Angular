import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() displaySearch = false;
  @Input() postHeading = false;
  @Input() postHeadingText = '';
  @Input() age = 0;
  @Input() background: object = {};
  @Input() subheading: string[] = [];
  @Input() meta: string[] = [];
  query: string = '';
}
