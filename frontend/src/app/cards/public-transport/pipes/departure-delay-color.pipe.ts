import { Pipe, PipeTransform } from "@angular/core";
import { DepartureBoardItem } from "src/sdk";

@Pipe({
  name: "departureDelayColor",
  standalone: false,
})
export class DepartureDelayColorPipe implements PipeTransform {
  transform(departure: DepartureBoardItem): string | null {
    if (departure.delay?.is_available && departure.delay.minutes && departure.delay.minutes > 0) return "danger";
    else if (departure.delay?.is_available && departure.delay.seconds && departure.delay.seconds > 30)
      return "dark-warning";
    else return null;
  }
}
