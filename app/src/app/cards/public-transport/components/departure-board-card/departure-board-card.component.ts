import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { CardComponent } from 'src/app/schema/card-component';
import { DepartureBoardCard } from '../../schema/departure-board-card';
import { DepartureBoardData, DepartureData } from '../../schema/departure-board-data';
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

    if (this.card.definition.timeDisplay) {
      timer(0, 1000)
        .pipe(untilDestroyed(this))
        .subscribe(() => this.now = DateTime.local());
    }

    timer(0, 60 * 1000)
      .pipe(take(30))
      .pipe(untilDestroyed(this))
      .subscribe((i) => this.loadDepartures());
  }

  getRemainingTime(departure: string, now: DateTime) {
    const diff = DateTime.fromISO(departure).diff(now, "minutes");
    if (diff.minutes <= 0 && diff.seconds <= 0) return "0:00";

    return String(Math.floor(diff.minutes));
  }

  private async loadDepartures() {

    this.loadingDepartures = new Array(this.card.definition.limit || 5).fill(null);

    if (this.card.definition.name) {
      this.departureBoard = await this.departureBoardsService.getDepartureBoard({ name: this.card.definition.name, limit: this.card.definition.limit });
    }
    else {
      const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then(res => ({ lat: res.coords.latitude, lon: res.coords.longitude }));
      this.departureBoard = await this.departureBoardsService.getClosestDepartureBoard({ ...position, limit: this.card.definition.limit });
    }
  }

}
