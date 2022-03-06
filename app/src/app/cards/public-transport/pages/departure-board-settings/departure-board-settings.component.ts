import { Component, OnChanges, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";
import { DepartureBoardCard, DepartureBoardCardDefinition } from "../../schema/departure-board-card";
import { StopData, StopPlatformData } from "../../schema/stop-data";
import { StopsService } from "../../services/stops.service";

@Component({
  selector: "pd-departure-board-settings",
  templateUrl: "./departure-board-settings.component.html",
  styleUrls: ["./departure-board-settings.component.scss"],
})
export class DepartureBoardSettingsComponent implements OnInit, OnChanges {
  card?: DepartureBoardCard;

  definition!: DepartureBoardCardDefinition;

  stop?: StopData;

  constructor(private dash: DashboardService, private stopsService: StopsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.loadCard(params["id"]));
  }

  async loadCard(id: string) {
    this.card = await this.dash.getCard(id);

    this.definition = Object.assign(new DepartureBoardCardDefinition(null), this.card!.definition);

    this.loadDepartureBoard();
  }

  ngOnChanges() {}

  async loadDepartureBoard() {
    if (this.definition.name) {
      this.stop = await this.stopsService.getStop(this.definition.name);
    }
  }

  save() {
    if (!this.card) return;
    this.dash.saveCard({ ...this.card, definition: this.definition });
  }

  getPlatformDirections(platform: StopPlatformData) {
    return platform.lines?.map((line) => line.direction).join(", ") || "";
  }
}
