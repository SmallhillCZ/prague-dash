import { Component, Input, OnInit } from "@angular/core";
import { DateTime } from "luxon";
import { CardComponent } from "src/app/schema/card-component";
import { GeolocationService } from "src/app/services/geolocation.service";
import * as SunCalc from "suncalc";
import { SunCard } from "../../schema/sun-card";

@Component({
    selector: "pd-sun-card",
    templateUrl: "./sun-card.component.html",
    styleUrls: ["./sun-card.component.scss"],
    standalone: false
})
export class SunCardComponent implements CardComponent, OnInit {
  @Input() card!: SunCard;

  times?: SunCalc.GetTimesResult;

  wasSun?: boolean;

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    this.getSunTimes();
  }

  private async getSunTimes() {
    const position = await this.geolocationService.getCurrentPosition({ enableHighAccuracy: false });
    if (!position) return;

    const today = DateTime.local().toJSDate();
    const tomorrow = DateTime.local().plus({ days: 1 }).toJSDate();

    const times = SunCalc.getTimes(today, position.coords.latitude, position.coords.longitude);
    const timesNext = SunCalc.getTimes(tomorrow, position.coords.latitude, position.coords.longitude);

    this.times = this.mergeTimes(times, timesNext);
  }

  private mergeTimes(times: SunCalc.GetTimesResult, ...mergeTimes: SunCalc.GetTimesResult[]): SunCalc.GetTimesResult {
    const now = new Date();

    mergeTimes.forEach((mergeTimesItem) => {
      const values = <[keyof SunCalc.GetTimesResult, SunCalc.GetTimesResult[keyof SunCalc.GetTimesResult]][]>(
        Object.entries(mergeTimesItem)
      );

      values.forEach(([key, value]) => {
        if (times[key] < now) times[key] = value;
      });
    });

    return times;
  }
}
