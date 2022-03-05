import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { DashboardService } from "src/app/services/dashboard.service";
import { DepartureBoardCard } from "../../schema/departure-board-card";
import { DepartureBoardData, DepartureData } from "../../schema/departure-board-data";
import { RouteTypes } from "../../schema/route-type";
import { DepartureBoardsService, LoadDeparturesOptions } from "../../services/departure-boards.service";
import { StopsService } from "../../services/stops.service";

@Component({
  selector: "pd-departure-board-detail",
  templateUrl: "./departure-board-detail.component.html",
  styleUrls: ["./departure-board-detail.component.scss"],
})
export class DepartureBoardDetailComponent implements OnInit {
  card?: DepartureBoardCard;
  departureBoard?: DepartureBoardData;

  limit = 40;

  loading: boolean = false;

  loadingArray = new Array(10).fill(null);

  name?: string;

  constructor(
    private dashboard: DashboardService,
    private departureBoardsService: DepartureBoardsService,
    private stopsService: StopsService,
    private route: ActivatedRoute,
    private navController: NavController
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.loadCard(params["id"]));
  }

  async loadCard(id: string) {
    this.card = await this.dashboard.getCard(id);
    await this.loadDepartures();
  }

  async loadDepartures(refreshEvent?: any) {
    if (!this.card) return;

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
      limit: 20,
    };

    this.departureBoard = await this.departureBoardsService.loadDepartures(definition).catch((err) => undefined);

    this.loading = false;

    if (refreshEvent) refreshEvent.target.complete();
  }

  async loadMore(event: any) {
    if (!this.departureBoard || !this.card) return;

    const definition: LoadDeparturesOptions = {
      ...this.card.definition,
      name: this.name!,
      limit: 20,
      offset: this.departureBoard?.departures.length,
    };

    try {
      const departures = await this.departureBoardsService
        .loadDepartures(definition)
        .then((departureBoard) => departureBoard.departures);

      this.departureBoard.departures.push(...departures);
    } catch (err) {
      // pass
    }

    event.target?.complete();

    if (this.departureBoard.departures.length >= 1000) {
      event.target.disabled = true;
    }
  }

  openDeparture(departure: DepartureData) {
    if (this.hasPosition(departure))
      this.navController.navigateForward("/public-transport/vehicle-position/" + departure.trip.id);
  }

  hasPosition(departure: DepartureData) {
    return RouteTypes[departure.route.type]?.tracked;
  }
}
