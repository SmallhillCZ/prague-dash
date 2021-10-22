import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { ScreenReaderService } from 'src/app/core/services/screen-reader.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { CardComponent } from 'src/app/schema/card-component';
import { DepartureBoardCard } from '../../schema/departure-board-card';
import { DepartureBoardData } from '../../schema/departure-board-data';
import { RouteTypes } from '../../schema/route-type';
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
    private screenReaderService: ScreenReaderService,
    private settingsService: SettingsService
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

    const isScreenReaderEnabled = await this.settingsService.getSettings().then(settings => settings.screenReaderEnabled);

    if (isScreenReaderEnabled) {
      this.screenReaderSpeak();
    }
  }

  async screenReaderSpeak() {
    this.screenReaderService.speak(`Odjezdy ze zastávky ${this.departureBoard?.stops[0].stop_name}: `);

    this.departureBoard?.departures.forEach(departure => {
      const minutes = Math.floor(Math.abs(DateTime.fromISO(departure.departure_timestamp.predicted).diffNow("minutes").minutes));

      let minutesString = "";

      switch (minutes) {
        case 0: minutesString = "nyní"; break;
        case 1: minutesString = "za jednu minutu"; break;
        case 2: minutesString = "za dvě minuty"; break;
        case 3: minutesString = "za tři minuty"; break;
        case 4: minutesString = "za čtyři minuty"; break;
        case 5: minutesString = "za pět minut"; break;
        case 6: minutesString = "za šest minut"; break;
        case 7: minutesString = "za sedm minut"; break;
        case 8: minutesString = "za osm minut"; break;
        case 9: minutesString = "za devět minut"; break;
        case 10: minutesString = "za deset minut"; break;
        default: `za ${minutes} minut`; break;
      }

      const lineString = RouteTypes[departure.route.type]?.name.cs || "Linka";

      this.screenReaderService.speak(`${lineString} ${departure.route.short_name} směr ${departure.trip.headsign} odjíždí ${minutesString}.`);

    });

  }

}
