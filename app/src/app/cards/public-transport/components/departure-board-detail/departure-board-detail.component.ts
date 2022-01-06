import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardDetailComponent } from 'src/app/schema/card-detail-component';
import { DepartureBoardCard, DepartureBoardCardDefinition } from '../../schema/departure-board-card';
import { DepartureBoardData } from '../../schema/departure-board-data';
import { DepartureBoardsService, LoadDeparturesOptions } from '../../services/departure-boards.service';
import { StopsService } from '../../services/stops.service';

@Component({
  selector: 'app-departure-board-detail',
  templateUrl: './departure-board-detail.component.html',
  styleUrls: ['./departure-board-detail.component.scss']
})
export class DepartureBoardDetailComponent implements CardDetailComponent, OnInit {


  @Input() card!: DepartureBoardCard;

  @Output() title = new EventEmitter<string>();

  departureBoard?: DepartureBoardData;

  limit = 40;

  loading: boolean = false;

  loadingArray = new Array(10).fill(null);

  name?: string;

  constructor(
    private departureBoardsService: DepartureBoardsService,
    private stopsService: StopsService
  ) { }

  ngOnInit(): void {
    this.loadDepartures();
  }

  async loadDepartures(refreshEvent?: any) {

    this.loading = true;

    if (this.card.definition.name !== null) {
      this.name = this.card.definition.name;
    }
    else {
      const stop = await this.stopsService.getClosestStop();
      this.name = stop.name;
      console.log(stop);
    }

    const definition: LoadDeparturesOptions = {
      ...this.card.definition,
      name: this.name,
      limit: 20,
    };

    this.departureBoard = await this.departureBoardsService.loadDepartures(definition)
      .catch(err => undefined);

    this.loading = false;

    if (!this.card.definition.name) this.title.emit(this.departureBoard.stops[0].stop_name);

    if (refreshEvent) refreshEvent.target.complete();
  }

  async loadMore(event: any) {
    if (!this.departureBoard) return;

    const definition: LoadDeparturesOptions = {
      ...this.card.definition,
      name: this.name!,
      limit: 20,
      offset: this.departureBoard?.departures.length
    };

    try {
      const departures = await this.departureBoardsService.loadDepartures(definition).then(departureBoard => departureBoard.departures);

      this.departureBoard.departures.push(...departures);
    }
    catch (err) {
      // pass
    }

    event.target?.complete();

    if (this.departureBoard.departures.length >= 1000) {
      event.target.disabled = true;
    }
  }

}
