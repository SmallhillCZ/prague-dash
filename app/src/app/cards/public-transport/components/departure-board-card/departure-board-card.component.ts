import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { CardComponent } from 'src/app/schema/card-component';
import { DepartureBoardCard } from '../../schema/departure-board-card';
import { DepartureBoardData } from '../../schema/departure-board-data';
import { DepartureBoardsService } from '../../services/departure-boards.service';

@UntilDestroy()
@Component({
  selector: 'app-departure-board-card',
  templateUrl: './departure-board-card.component.html',
  styleUrls: ['./departure-board-card.component.scss']
})
export class DepartureBoardCardComponent implements CardComponent, OnInit {

  departureBoard?: DepartureBoardData;

  loadingDepartures?: any[];

  now = DateTime.local();

  constructor(
    private departureBoardsService: DepartureBoardsService
  ) { }

  @Input()
  card!: DepartureBoardCard;

  ngOnInit(): void {

    this.loadDepartures();

    timer(0, 60 * 1000)
      .pipe(take(30))
      .pipe(untilDestroyed(this))
      .subscribe((i) => this.loadDepartures());
  }

  private async loadDepartures() {

    this.departureBoard = await this.departureBoardsService.loadDepartures(this.card.definition);

  }

}
