import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class SortComponent implements OnInit, OnChanges {
  @Input() sortBy: string ='';
  @Output() sortByChange = new EventEmitter<string>();

  public sortOrder: 'asc' | 'desc' = 'asc'; // Ordre de tri par défaut
  public orderBySelectValue = 'title';
  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.sortBy = changes['sortBy'].currentValue;
      this.updateSortBy()
    }
  }
  ngOnInit(): void {

    this.updateSortBy()
    const orderBy = this.userService.getOption('sort_by', '.') as string[];
    if (!!orderBy?.length) {
      this.orderBySelectValue = orderBy[0];
    }
  }
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Inversion de l'ordre de tri
    let orderBy = this.userService.getOption('sort_by', '.') as string[];
    if (!!orderBy?.length) {
      this.emit(orderBy[0]);
    }
  }

  handleOrderByChange(event: any) {
    this.emit(event);
  }

  emit(sortBy: string) {
    this.sortByChange.emit(sortBy + '.' + this.sortOrder);
  }

  updateSortBy(){
    if(!!this.sortBy){
      
    }else{
      this.sortBy  = 'title.asc'

    }
      const sortByParameters = this.sortBy.split('.');
      
      this.sortOrder = sortByParameters[1] as 'asc' | 'desc';
      this.orderBySelectValue = sortByParameters[0];
  }
}
