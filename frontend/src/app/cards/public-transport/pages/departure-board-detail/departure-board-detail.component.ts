import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { NavController } from "@ionic/angular";
import { DashboardService } from "src/app/services/dashboard.service";
import { DepartureBoardItem, DepartureBoardResponse } from "src/sdk";
import { DepartureBoardCard } from "../../schema/departure-board-card";
import { RouteTypes } from "../../schema/route-type";
import { DepartureBoardsService, LoadDeparturesOptions } from "../../services/departure-boards.service";
import { StopsService } from "../../services/stops.service";

@Component({
  selector: "pd-departure-board-detail",
  templateUrl: "./departure-board-detail.component.html",
  styleUrls: ["./departure-board-detail.component.scss"],
  standalone: false,
})
export class DepartureBoardDetailComponent implements OnInit {
  card?: DepartureBoardCard;
  departureBoard?: DepartureBoardResponse;

  limit = 40;

  loading: boolean = false;
  loadingArray = new Array(10).fill(null);

  stopNotFound: boolean = false;

  name?: string;

  constructor(
    private dashboard: DashboardService,
    private departureBoardsService: DepartureBoardsService,
    private stopsService: StopsService,
    private route: ActivatedRoute,
    private navController: NavController,
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
      offset: this.departureBoard?.departures?.length ?? 0,
    };

    try {
      const departures = await this.departureBoardsService
        .loadDepartures(definition)
        .then((departureBoard) => departureBoard.departures);

      if (departures?.length) {
        if (!this.departureBoard.departures) this.departureBoard.departures = [];

        this.departureBoard.departures.push(...departures);
      }
    } catch (err) {
      // pass
    }

    event.target?.complete();

    if (this.departureBoard.departures && this.departureBoard.departures.length >= 1000) {
      event.target.disabled = true;
    }
  }

  openDeparture(departure: DepartureBoardItem) {
    if (!this.hasDetail(departure) || !departure.stop || !departure.trip) return;

    const queryParams: Params = { platform: departure.stop.id };
    this.navController.navigateForward("/public-transport/vehicle-position/" + departure.trip.id, { queryParams });
  }

  hasDetail(departure: DepartureBoardItem) {
    if (!departure.route?.type) return false;

    return (
      departure.route.type in RouteTypes &&
      RouteTypes[<keyof typeof RouteTypes>departure.route.type]?.tracked &&
      !departure.trip?.is_canceled
    );
  }
}
