import { Target } from './../../../../node_modules/@angular-devkit/architect/src/api.d';
import { MatSliderModule } from '@angular/material/slider';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MinutesToHoursPipe } from '../../../_pipe/minutes-to-hours.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-runtime',
  standalone: true,
  imports: [MatSliderModule, ReactiveFormsModule],
  templateUrl: './runtime.component.html',
  styleUrl: './runtime.component.css',
})
export class RuntimeComponent {
  @Input() runtimeLte!: number;
  @Input() runtimeGte!: number;
  @Output() runtimeEmitter = new EventEmitter<number[]>();

  startCtrl = new FormControl();
  endCtrl = new FormControl();
  start: number = 0;
  end: number = 300;

  handleRuntimeChanges(event: any) {
    this.runtimeEmitter.emit([this.start, this.end]);
  }

  runtimeLabel(value: number) {
    const pipe = new MinutesToHoursPipe();
    if (!!value) {
      return pipe.transform(+value);
    }
    return '0';
  }
}
