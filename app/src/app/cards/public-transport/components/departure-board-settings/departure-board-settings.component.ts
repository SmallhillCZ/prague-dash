import { Component, EventEmitter, OnChanges, OnInit } from "@angular/core";
import { DepartureBoardCard, DepartureBoardCardDefinition } from "../../schema/departure-board-card";
import { StopData, StopPlatformData } from "../../schema/stop-data";
import { StopsService } from "../../services/stops.service";

@Component({
  selector: "app-departure-board-settings",
  templateUrl: "./departure-board-settings.component.html",
  styleUrls: ["./departure-board-settings.component.scss"],
})
export class DepartureBoardSettingsComponent implements OnInit, OnChanges {
  // TODO: call service to get card and save settings
  card!: DepartureBoardCard;
  change = new EventEmitter<DepartureBoardCardDefinition>();

  definition!: DepartureBoardCardDefinition;

  stop?: StopData;

  constructor(private stopsService: StopsService) {}

  ngOnInit(): void {
    this.definition = Object.assign(new DepartureBoardCardDefinition(null), this.card.definition);

    this.loadDepartureBoard();
  }

  ngOnChanges() {}

  async loadDepartureBoard() {
    if (this.definition.name) {
      this.stop = await this.stopsService.getStop({ name: this.definition.name });
    }
  }

  save() {
    this.change.emit(this.definition);
  }

  getPlatformDirections(platform: StopPlatformData) {
    return platform.lines?.map((line) => line.direction).join(", ") || "";
  }
}
