import { Pipe, PipeTransform } from "@angular/core";
import { DepartureBoardItem } from "src/sdk";
import { DepartureBoardCardDefinition } from "../schema/departure-board-card";

@Pipe({
  name: "departureDelay",
  standalone: false,
})
export class DepartureDelayPipe implements PipeTransform {
  transform(departure: DepartureBoardItem, options: DepartureBoardCardDefinition): string | null {
    const time = this.getTime(departure);

    if (!time) return null;

    return options.addDelay ? `(${time})` : time;
  }

  getTime(departure: DepartureBoardItem) {
    if (!departure.delay?.is_available) return null;

    if (departure.delay.minutes && departure.delay.minutes > 0) return `+${departure.delay.minutes} min`;

    if (departure.delay.minutes === 0 && departure.delay.seconds && departure.delay.seconds > 30) return "+30 s";
    else return null;
  }
}
