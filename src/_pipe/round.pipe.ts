import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true,
})
export class RoundPipe implements PipeTransform {
  transform(value: number, decimals = 0): number {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
}
