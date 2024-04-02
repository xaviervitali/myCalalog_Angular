import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'minutesToHours',
  standalone: true,
})
/**
 * permet de convertir des minutes en hh:mm
 */
export class MinutesToHoursPipe implements PipeTransform {
  transform(value: number): string {
    const duration = moment.duration(value, 'minutes');
    return moment.utc(duration.asMilliseconds()).format('H[h]mm');
  }
}
