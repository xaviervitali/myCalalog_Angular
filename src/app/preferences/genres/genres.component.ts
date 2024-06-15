import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GenreResults } from '../../../_models/genre';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent  implements OnInit, OnChanges {
  @Input() genres_: GenreResults[] = [];
  @Input() userWithoutGenres_: string = '';
  @Output() withoutGenresEmitter = new EventEmitter<string[]>();

  private withoutGenres: string[] = [];


  get userWithoutGenres(){
    return this.userWithoutGenres_.split('|')
  }

  public form = this.fb.group({
    genreControls :  this.fb.array([])
  })


  get genres(){
    return this.form.controls['genreControls'] as FormArray 
  }

  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {

    if (!!this.genres) {
      this.sortGenres();
      this.genres_.forEach(genre=>{
        const genreForm = this.fb.group({
          id: [genre.id],
          name: [genre.name]
        });
        this.genres.push(genreForm)
      })
      
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['userWithoutGenres_'] && !!changes['userWithoutGenres_'].currentValue){
      this.withoutGenres =[...new Set([...this.userWithoutGenres, ...this.withoutGenres])]
    }
  }

  onGenreChange(event: MatSlideToggleChange, genreId: number): void {
    if (!event.checked) {
      this.withoutGenres.push(String(genreId))
    } else {
      this.withoutGenres = this.withoutGenres.filter(e=>e !== String(genreId))
    }
    this.withoutGenresEmitter.emit(this.withoutGenres)
  }
  
  sortGenres() {
    this.genres_.sort((a, b) => a.name.localeCompare(b.name));
  }

 
}
