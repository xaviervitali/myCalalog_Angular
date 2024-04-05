import { environment } from './../../../environment/environment';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class CrewComponent implements OnInit {
  @Input() crew: any;
  @Input() title: string = '';
  public environment = environment;
  constructor() {}

  ngOnInit() {}
}
