import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Card } from 'src/app/schema/card';
import { CardDetailComponent } from 'src/app/schema/card-detail-component';
import { DepartureBoardCard, DepartureBoardCardDefinition } from '../../schema/departure-board-card';
import { DepartureBoardData } from '../../schema/departure-board-data';
import { DepartureBoardsService } from '../../services/departure-boards.service';
import { DepartureBoardContentComponentOptions } from '../departure-board-content/departure-board-content.component';

@Component({
  selector: 'app-departure-board-detail',
  templateUrl: './departure-board-detail.component.html',
  styleUrls: ['./departure-board-detail.component.scss']
})
export class DepartureBoardDetailComponent implements CardDetailComponent, OnInit {


  @Input() card!: DepartureBoardCard;

  departureBoard?: DepartureBoardData;
  options: DepartureBoardContentComponentOptions = {};

  limit = 40;

  constructor(
    private departureBoardsService: DepartureBoardsService
  ) { }

  ngOnInit(): void {
    this.options = {
      ...this.card.definition,
      limit: this.limit
    };
    this.loadDepartures();
  }

  private async loadDepartures() {

    const definition = {
      ...this.card.definition,
      limit: 20,
    };

    this.departureBoard = await this.departureBoardsService.loadDepartures(definition);

  }

  async loadMore() {
    const definition = {
      ...this.card.definition,
      limit: 20,
      offset: this.departureBoard?.departures.length
    };

    const departures = await this.departureBoardsService.loadDepartures(definition).then(departureBoard => departureBoard.departures);

    this.departureBoard?.departures.push(...departures);
  }

}
