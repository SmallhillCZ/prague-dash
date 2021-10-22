import { Component, Input, OnInit } from '@angular/core';
import { ScreenReader } from '@capacitor/screen-reader';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
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
    private departureBoardsService: DepartureBoardsService
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

    const isScreenReaderEnabled = await ScreenReader.isEnabled()
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

      switch (departure.route.type) {

        case RouteType.Bus:
        case RouteType.Tram:
          value += `${RouteTypes[departure.route.type]?.name.cs} číslo ${departure.route.short_name} směr ${departure.trip.headsign} odjíždí za ${minutes} minut.`;
          break;

        case RouteType.Subway:
          value += `Metro linky ${departure.route.short_name} směr ${departure.trip.headsign} odjíždí za ${minutes} minut.`;
          break;
      }

    });

    await ScreenReader.speak({ value, language: "cs" });
  }

}
