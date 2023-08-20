import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { CardCreateData } from "src/app/schema/card-create-data";
import { DashboardService } from "src/app/services/dashboard.service";
import { GeolocationService } from "src/app/services/geolocation.service";
import { DepartureBoardCard, DepartureBoardCardDefinition } from "../../schema/departure-board-card";
import { StopData } from "../../schema/stop-data";
import { StopsService } from "../../services/stops.service";

@Component({
  selector: "pd-departure-board-select",
  templateUrl: "./departure-board-select.component.html",
  styleUrls: ["./departure-board-select.component.scss"],
})
export class DepartureBoardSelectComponent implements OnInit, OnDestroy {
  view: "map" | "list" = "list";

  stops: StopData[] = [];

  search: string = "";

  constructor(
    private stopsService: StopsService,
    private dash: DashboardService,
    private route: ActivatedRoute,
    private navController: NavController,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit(): void {
    this.loadStops();
  }

  ngOnDestroy() {}

  async loadStops() {
    const coordinates = await this.geolocationService
      .getCurrentPosition({ enableHighAccuracy: true })
      .then((position) => {
        if (position) return { lat: position.coords.latitude, lon: position.coords.longitude };
        else return undefined;
      })
      .catch((err) => undefined);

    this.stops = await this.stopsService.getStops({
      coordinates,
      search: this.search || undefined,
    });
  }

  selectStop(stop: StopData) {
    const definition = new DepartureBoardCardDefinition(stop.name);
    definition.platforms = stop.platforms.reduce(
      (acc, cur) => ((acc[cur.id] = true), acc),
      {} as { [id: string]: boolean }
    );

    this.createCard(definition, stop.name);
  }

  selectClosestStop() {
    const definition = new DepartureBoardCardDefinition(null);
    this.createCard(definition, "Nejbližší zastávka");
  }

  async createCard(definition: DepartureBoardCardDefinition, title: string) {
    const cardData: CardCreateData<DepartureBoardCard> = {
      type: "departure-board",
      title,
      definition,
    };

    const pageId = this.route.snapshot.queryParams["page"];

    await this.dash.createCard(cardData, pageId);

    this.navController.navigateRoot("/dash", { queryParams: { page: pageId } });
  }
}
