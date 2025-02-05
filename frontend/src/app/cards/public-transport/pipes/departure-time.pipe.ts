import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { DateTime } from "luxon";
import { timer } from "rxjs";
import { DepartureBoardItem } from "src/sdk";
import { DepartureBoardCardDefinition } from "../schema/departure-board-card";

@UntilDestroy()
@Pipe({
  name: "departureTime",
  pure: false,
  standalone: false,
})
export class DepartureTimePipe implements PipeTransform {
  now: DateTime = DateTime.local();

  constructor(private datePipe: DatePipe) {
    timer(1000, 1000)
      .pipe(untilDestroyed(this))
      .subscribe(() => (this.now = DateTime.local()));
  }

  transform(departure: DepartureBoardItem, options: DepartureBoardCardDefinition): string | null {
    const departureTime = options.addDelay
      ? departure.departure_timestamp?.predicted
      : departure.departure_timestamp?.scheduled;
    if (!departureTime) return null;

    switch (options?.timeDisplay) {
      case "remaining":
        return this.getRemainingTime(departureTime, this.now) + " min";
      case "time":
        return this.datePipe.transform(departureTime, "H:mm");
    }

    return null;
  }

  getRemainingTime(departure: string, now: DateTime) {
    const diff = DateTime.fromISO(departure).diff(now, "minutes");
    if (diff.minutes <= 0 && diff.seconds <= 0) return "0";
    return String(Math.floor(diff.minutes));
  }
}
