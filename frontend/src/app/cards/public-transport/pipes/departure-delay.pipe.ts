import { Pipe, PipeTransform } from '@angular/core';
import { DepartureBoardCardDefinition } from '../schema/departure-board-card';
import { DepartureData } from '../schema/departure-board-data';

@Pipe({
  name: 'departureDelay'
})
export class DepartureDelayPipe implements PipeTransform {

  transform(departure: DepartureData, options: DepartureBoardCardDefinition): string | null {
    const time = this.getTime(departure);

    if (!time) return null;

    return options.addDelay ? `(${time})` : time;
  }

  getTime(departure: DepartureData) {
    if (!departure.delay.is_available) return null;

    if (departure.delay.minutes > 0) return `+${departure.delay.minutes} min`;

    if (departure.delay.minutes === 0 && departure.delay.seconds > 30) return "+30 s";

    else return null;
  }

}
