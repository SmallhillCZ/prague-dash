import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/schema/card';
import { CardSettingsComponent } from 'src/app/schema/card-settings-component';
import { DepartureBoardCard, DepartureBoardCardDefinition } from '../../schema/departure-board-card';
import { DepartureBoardData } from '../../schema/departure-board-data';
import { StopData, StopPlatformData } from '../../schema/stop-data';
import { DepartureBoardsService } from '../../services/departure-boards.service';
import { StopsService } from '../../services/stops.service';

@Component({
  selector: 'app-departure-board-settings',
  templateUrl: './departure-board-settings.component.html',
  styleUrls: ['./departure-board-settings.component.scss']
})
export class DepartureBoardSettingsComponent implements CardSettingsComponent, OnInit, OnChanges {

  @Input()
  card!: DepartureBoardCard;

  @Output()
  change = new EventEmitter<DepartureBoardCardDefinition>();

  definition!: DepartureBoardCardDefinition;

  stop?: StopData;

  defaultSettings: DepartureBoardCardDefinition = {
    addDelay: false,
    allPlatforms: true,
    platforms: {},
    limit: 5,
    name: undefined,
    showWheelchairAccessible: false,
    timeDisplay: "time"
  };

  constructor(
    private stopsService: StopsService
  ) { }

  ngOnInit(): void {
    this.definition = Object.assign({}, this.defaultSettings, this.card.definition);

    this.loadDepartureBoard();
  }

  ngOnChanges() {
  }

  async loadDepartureBoard() {

    if (this.definition.name) {
      this.stop = await this.stopsService.getStop({ name: this.definition.name });
    }

  }

  save() {
    this.change.emit(this.definition);
  }

  getPlatformDirections(platform: StopPlatformData) {
    return platform.lines?.map(line => line.direction).join(", ") || "";
  }

}
