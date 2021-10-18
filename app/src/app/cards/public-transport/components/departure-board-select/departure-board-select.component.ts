import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { CardSelectComponent, CardSelectComponentButton } from 'src/app/schema/card-select-component';
import { DepartureBoardCardDefinition } from '../../schema/departure-board-card';
import { StopData } from '../../schema/stop-data';
import { StopsService } from '../../services/stops.service';

@Component({
  selector: 'app-departure-board-select',
  templateUrl: './departure-board-select.component.html',
  styleUrls: ['./departure-board-select.component.scss']
})
export class DepartureBoardSelectComponent implements CardSelectComponent, OnInit, OnDestroy {

  @Output()
  select = new EventEmitter<DepartureBoardCardDefinition>();

  @Output()
  buttons = new EventEmitter<CardSelectComponentButton[]>();

  view: "map" | "list" = "list";

  stops: StopData[] = [];

  search: string = "";

  constructor(
    private stopsService: StopsService
  ) { }

  ngOnInit(): void {
    this.updateButtons();

    this.loadStops();
  }

  ngOnDestroy() {

  }

  async loadStops() {

    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      .then(position => {
        if (position) return { lat: position.coords.latitude, lon: position.coords.longitude };
        else return undefined;
      })
      .catch(err => undefined);

    this.stops = await this.stopsService.getStops({
      coordinates,
      search: this.search || undefined
    });
  }

  selectStop(stop: StopData) {
    const definition = new DepartureBoardCardDefinition(stop.name);
    definition.platforms = stop.platforms.reduce((acc, cur) => (acc[cur.id] = true, acc), {} as { [id: string]: boolean; });
    this.select.emit(definition);
  }

  selectClosestStop() {
    const definition = new DepartureBoardCardDefinition(null);
    this.select.emit(definition);
  }


  private updateButtons() {
    const buttons: CardSelectComponentButton[] = [];

    if (this.view === 'list') {
      buttons.push({
        icon: "map-outline",
        handler: () => {
          this.view = "map";
          this.updateButtons();
        }
      });
    }

    if (this.view === 'map') {
      buttons.push({
        icon: "list-outline",
        handler: () => {
          this.view = "list";
          this.updateButtons();
        }
      });
    }

    this.buttons.emit(buttons);
  }

}

