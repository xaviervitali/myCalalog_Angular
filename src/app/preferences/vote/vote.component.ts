import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css',
})
export class VoteComponent implements OnChanges, OnInit {
  voteControl = new FormControl();
  @Input() voteCountGte!: number;
  @Output() voteEmitter = new EventEmitter<number>();
  public vote!: number;
  ngOnInit(): void {
    this.voteControl.valueChanges.subscribe((value: number) =>
      this.voteEmitter.emit(value)
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['voteCountGte']) {
      this.vote = changes['voteCountGte'].currentValue;
      this.voteControl.setValue(changes['voteCountGte'].currentValue);
    }
  }
}
