import { Component, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { Geolocation } from "@capacitor/geolocation";
import { CardCreateData } from "src/app/schema/card-create-data";
import { DepartureBoardCard, DepartureBoardCardDefinition } from "../../schema/departure-board-card";
import { StopData } from "../../schema/stop-data";
import { StopsService } from "../../services/stops.service";

@Component({
  selector: "app-departure-board-select",
  templateUrl: "./departure-board-select.component.html",
  styleUrls: ["./departure-board-select.component.scss"],
})
export class DepartureBoardSelectComponent implements OnInit, OnDestroy {
  // TODO: call service to select
  select = new EventEmitter<CardCreateData<DepartureBoardCard>>();

  view: "map" | "list" = "list";

  stops: StopData[] = [];

  search: string = "";

  constructor(private stopsService: StopsService) {}

  ngOnInit(): void {
    this.loadStops();
  }

  ngOnDestroy() {}

  async loadStops() {
    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
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
    this.select.emit({ definition, title: stop.name });
  }

  selectClosestStop() {
    const definition = new DepartureBoardCardDefinition(null);
    this.select.emit({ definition, title: "Nejbližší zastávka" });
  }
}
