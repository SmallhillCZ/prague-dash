import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { ScreenReaderService } from 'src/app/core/services/screen-reader.service';
import { CardComponent } from 'src/app/schema/card-component';
import { DepartureBoardCard } from '../../schema/departure-board-card';
import { DepartureBoardData } from '../../schema/departure-board-data';
import { RouteType, RouteTypes } from '../../schema/route-type';
import { DepartureBoardsService } from '../../services/departure-boards.service';

@UntilDestroy()
@Component({
  selector: 'app-departure-board-card',
  templateUrl: './departure-board-card.component.html',
  styleUrls: ['./departure-board-card.component.scss']
})
export class DepartureBoardCardComponent implements CardComponent, OnInit {

  departureBoard?: DepartureBoardData;

  loadingDepartures?: any[];

  now = DateTime.local();

  constructor(
    private departureBoardsService: DepartureBoardsService,
    private screenReaderService: ScreenReaderService
  ) { }

  @Input()
  card!: DepartureBoardCard;

  ngOnInit(): void {

    timer(0, 60 * 1000)
      .pipe(take(30))
      .pipe(untilDestroyed(this))
      .subscribe((i) => this.loadDepartures());
  }

  private async loadDepartures() {

    this.departureBoard = await this.departureBoardsService.loadDepartures(this.card.definition);

    const isScreenReaderEnabled = await this.screenReaderService.isEnabled()
      .then(res => res.value)
      .catch(() => false); // catch in browser where isEnabled not supported and prevent reading

    if (isScreenReaderEnabled) {
      this.screenReaderSpeak();
    }
  }

  async screenReaderSpeak() {
    let value = "";

    value += `Odjezdy ze zastávky ${this.departureBoard?.stops[0].stop_name}: `;

    this.departureBoard?.departures.forEach(departure => {
      const minutes = Math.round(Math.abs(DateTime.fromISO(departure.departure_timestamp.predicted).diffNow("minutes").minutes));

      let minutesString = "minut";
      if (minutes === 1) minutesString = "minutuF";
      if (minutes >= 2 && minutes <= 4) minutesString = "minuty";

      const lineString = RouteTypes[departure.route.type]?.name.cs || "Linka";

      value += `${lineString} ${departure.route.short_name} směr ${departure.trip.headsign} odjíždí za ${minutes} ${minutesString}.`;

    });

    await this.screenReaderService.speak({ value, language: "cs" });
  }

}
