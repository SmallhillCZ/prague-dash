import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { DateTime } from "luxon";
import { timer } from "rxjs";
import { take } from "rxjs/operators";
import { CardComponent } from "src/app/schema/card-component";
import { SettingsService } from "src/app/services/settings.service";
import { CardContentComponent } from "src/app/shared/components/card-content/card-content.component";
import { CardTitleComponent } from "src/app/shared/components/card-title/card-title.component";
import { CardComponent as CardElComponent } from "src/app/shared/components/card/card.component";
import { DepartureBoardResponse } from "src/sdk";
import { RouteBadgeComponent } from "../../components/route-badge/route-badge.component";
import { DepartureDelayColorPipe } from "../../pipes/departure-delay-color.pipe";
import { DepartureDelayPipe } from "../../pipes/departure-delay.pipe";
import { DepartureTimePipe } from "../../pipes/departure-time.pipe";
import { DepartureBoardCard } from "../../schema/departure-board-card";
import { DepartureBoardsService, LoadDeparturesOptions } from "../../services/departure-boards.service";
import { StopsService } from "../../services/stops.service";
import { RouterLink } from "@angular/router";

@UntilDestroy()
@Component({
  selector: "pd-departure-board-card",
  templateUrl: "./departure-board-card.component.html",
  styleUrls: ["./departure-board-card.component.scss"],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    CardElComponent,
    CardTitleComponent,
    CardContentComponent,
    RouteBadgeComponent,
    DepartureTimePipe,
    DepartureDelayPipe,
    DepartureDelayColorPipe,
  ],
})
export class DepartureBoardCardComponent implements CardComponent, OnInit {
  departureBoard?: DepartureBoardResponse;

  loading: boolean = false;
  loadingDepartures?: any[];

  stopNotFound: boolean = false;

  now = DateTime.local();

  name?: string;

  constructor(
    private departureBoardsService: DepartureBoardsService,
    private settingsService: SettingsService,
    private stopsService: StopsService,
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
    this.stopNotFound = false;

    if (this.card.definition.name !== null) {
      this.name = this.card.definition.name;
    } else {
      const stop = await this.stopsService.getClosestStop();
      if (!stop) {
        this.loading = false;
        this.stopNotFound = true;
        return;
      }
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

    this.loading = false;
  }
}
