import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { DepartureBoardData } from '../../schema/departure-board-data';

export interface DepartureBoardContentComponentOptions {
  addDelay?: boolean;
  timeDisplay?: "time" | "remaining";
  showWheelchairAccessible?: boolean;
  limit?: number;
}

@UntilDestroy()
@Component({
  selector: 'app-departure-board-content',
  templateUrl: './departure-board-content.component.html',
  styleUrls: ['./departure-board-content.component.scss']
})
export class DepartureBoardContentComponent implements OnInit {

  @Input() departureBoard?: DepartureBoardData;
  @Input() options: DepartureBoardContentComponentOptions = {};

  loadingDepartures?: any[] = [];

  now = DateTime.local();

  constructor() { }

  ngOnInit(): void {

    this.loadingDepartures = new Array(this.options?.limit || 5).fill(null);

    timer(0, 1000)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.now = DateTime.local());
  }

  getRemainingTime(departure: string, now: DateTime) {
    const diff = DateTime.fromISO(departure).diff(now, "minutes");
    if (diff.minutes <= 0 && diff.seconds <= 0) return "0";

    return String(Math.floor(diff.minutes));
  }

}
