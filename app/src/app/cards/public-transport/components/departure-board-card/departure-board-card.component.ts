import { Component, Input, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { DateTime } from "luxon";
import { timer } from "rxjs";
import { take } from "rxjs/operators";
import { ScreenReaderService } from "src/app/services/screen-reader.service";
import { SettingsService } from "src/app/services/settings.service";
import { CardComponent } from "src/app/schema/card-component";
import { DepartureBoardCard, DepartureBoardCardDefinition } from "../../schema/departure-board-card";
import { DepartureBoardData } from "../../schema/departure-board-data";
import { RouteTypes } from "../../schema/route-type";
import { StopData } from "../../schema/stop-data";
import { DepartureBoardsService, LoadDeparturesOptions } from "../../services/departure-boards.service";
import { StopsService } from "../../services/stops.service";

@UntilDestroy()
@Component({
  selector: "pd-departure-board-card",
  templateUrl: "./departure-board-card.component.html",
  styleUrls: ["./departure-board-card.component.scss"],
})
export class DepartureBoardCardComponent implements CardComponent, OnInit {
  departureBoard?: DepartureBoardData;

  loading: boolean = false;
  loadingDepartures?: any[];

  now = DateTime.local();

  name?: string;

  constructor(
    private departureBoardsService: DepartureBoardsService,
    private screenReaderService: ScreenReaderService,
    private settingsService: SettingsService,
    private stopsService: StopsService
  ) {}

  @Input()
  card!: DepartureBoardCard;

  ngOnInit(): void {
    this.loadingDepartures = new Array(this.card.definition?.limit || 5).fill(null);

    timer(0, 60 * 1000)
      .pipe(take(30))
      .pipe(untilDestroyed(this))
      .subscribe((i) => this.loadDepartures());
  }

  private async loadDepartures() {
    this.loading = true;

    if (this.card.definition.name !== null) {
      this.name = this.card.definition.name;
    } else {
      const stop = await this.stopsService.getClosestStop();
      this.name = stop.name;
    }

    const definition: LoadDeparturesOptions = {
      ...this.card.definition,
      name: this.name,
    };

    this.departureBoard = await this.departureBoardsService.loadDepartures(definition).catch((err) => undefined);

    const isScreenReaderEnabled = await this.settingsService
      .getSettings()
      .then((settings) => settings.screenReaderEnabled);

    if (isScreenReaderEnabled) {
      this.screenReaderSpeak();
    }

    this.loading = false;
  }

  async screenReaderSpeak() {
    if (!this.departureBoard) {
      this.screenReaderService.speak(`Pro zastávku ${this.name} nebyly nalezeny žádné odjezdy.`);
      return;
    }

    this.screenReaderService.speak(`Odjezdy ze zastávky ${this.departureBoard.stops[0].stop_name}: `);

    this.departureBoard.departures.forEach((departure) => {
      const minutes = Math.floor(
        Math.abs(DateTime.fromISO(departure.departure_timestamp.predicted).diffNow("minutes").minutes)
      );

      let minutesString = "";

      switch (minutes) {
        case 0:
          minutesString = "nyní";
          break;
        case 1:
          minutesString = "za jednu minutu";
          break;
        case 2:
          minutesString = "za dvě minuty";
          break;
        case 3:
          minutesString = "za tři minuty";
          break;
        case 4:
          minutesString = "za čtyři minuty";
          break;
        case 5:
          minutesString = "za pět minut";
          break;
        case 6:
          minutesString = "za šest minut";
          break;
        case 7:
          minutesString = "za sedm minut";
          break;
        case 8:
          minutesString = "za osm minut";
          break;
        case 9:
          minutesString = "za devět minut";
          break;
        case 10:
          minutesString = "za deset minut";
          break;
        default:
          `za ${minutes} minut`;
          break;
      }

      const lineString = RouteTypes[departure.route.type]?.name.cs || "Linka";

      this.screenReaderService.speak(
        `${lineString} ${departure.route.short_name} směr ${departure.trip.headsign} odjíždí ${minutesString}.`
      );
    });
  }
}
