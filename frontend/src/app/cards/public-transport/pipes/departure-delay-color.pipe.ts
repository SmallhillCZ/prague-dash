import { Pipe, PipeTransform } from '@angular/core';
import { DepartureData } from '../schema/departure-board-data';

@Pipe({
    name: 'departureDelayColor',
    standalone: false
})
export class DepartureDelayColorPipe implements PipeTransform {

  transform(departure: DepartureData): string | null {

    if (departure.delay.is_available && departure.delay.minutes > 0) return "danger";

    else if (departure.delay.is_available && departure.delay.seconds > 30) return "dark-warning";

    else return null;
  }

}
