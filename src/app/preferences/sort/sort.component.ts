import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../_services/user.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatIcon],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css',
})
export class SortComponent implements OnInit {
  @Input() setUserSetting = true;
  @Input() disclaimer = true;
  @Output() valueChange = new EventEmitter<string>();
  public sortOrder: 'asc' | 'desc' = 'desc'; // Ordre de tri par défaut

  public orderBySelectValue = 'popularity';

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    const orderBy = this.userService.getOption('sort_by', '.') as string[];
    if (!!orderBy?.length) {
      this.orderBySelectValue = orderBy[0];
    }
  }
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Inversion de l'ordre de tri
    let orderBy = this.userService.getOption('sort_by', '.') as string[];
    if (!!orderBy?.length) {
      this.userService.setOption('sort_by', orderBy[0] + '.' + this.sortOrder);
    }
  }

  handleOrderByChange(event: any) {
    this.userService.setOption('sort_by', event + '.' + this.sortOrder);
  }
}
