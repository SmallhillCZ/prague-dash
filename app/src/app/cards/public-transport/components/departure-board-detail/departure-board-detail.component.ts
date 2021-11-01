import { Component, Input, OnInit } from '@angular/core';
import { CardDetailComponent } from 'src/app/schema/card-detail-component';
import { DepartureBoardCard } from '../../schema/departure-board-card';
import { DepartureBoardData } from '../../schema/departure-board-data';
import { DepartureBoardsService } from '../../services/departure-boards.service';

@Component({
  selector: 'app-departure-board-detail',
  templateUrl: './departure-board-detail.component.html',
  styleUrls: ['./departure-board-detail.component.scss']
})
export class DepartureBoardDetailComponent implements CardDetailComponent, OnInit {


  @Input() card!: DepartureBoardCard;

  departureBoard?: DepartureBoardData;

  limit = 40;

  loadingArray = new Array(10).fill(null);

  constructor(
    private departureBoardsService: DepartureBoardsService
  ) { }

  ngOnInit(): void {
    this.loadDepartures();
  }

  async loadDepartures(refreshEvent?: any) {

    const definition = {
      ...this.card.definition,
      limit: 20,
    };

    this.departureBoard = await this.departureBoardsService.loadDepartures(definition);

    if (refreshEvent) refreshEvent.target.complete();
  }

  async loadMore(event: any) {
    const definition = {
      ...this.card.definition,
      limit: 20,
      offset: this.departureBoard?.departures.length
    };

    const departures = await this.departureBoardsService.loadDepartures(definition).then(departureBoard => departureBoard.departures);

    this.departureBoard?.departures.push(...departures);

    event.target?.complete();

    if (departures.length == 1000) {
      event.target.disabled = true;
    }
  }

}
