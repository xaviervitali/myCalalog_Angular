import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generateComma',
  standalone: true,
})
export class GenerateCommaPipe implements PipeTransform {
  transform(value: any[], key: string): string {
    const values = value.map((arr) => arr[key]);

    return values.join(', ');
  }
}
