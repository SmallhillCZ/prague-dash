import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { DateTime } from 'luxon';
import { CardComponent } from 'src/app/schema/card-component';
import * as SunCalc from "suncalc";
import { SunCard } from '../../schema/sun-card';
import { SunValuesData } from '../../schema/sun-values-data';

@Component({
  selector: 'app-sun-card',
  templateUrl: './sun-card.component.html',
  styleUrls: ['./sun-card.component.scss']
})
export class SunCardComponent implements CardComponent, OnInit {

  @Input() card!: SunCard;

  times?: SunCalc.GetTimesResult;

  wasSun?: boolean;

  constructor() { }

  ngOnInit(): void {
    this.getSunTimes();
  }

  private async getSunTimes() {
    const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: false });

    const today = DateTime.local().toJSDate();
    const tomorrow = DateTime.local().plus({ days: 1 }).toJSDate();

    const times = SunCalc.getTimes(today, position.coords.latitude, position.coords.longitude);
    const timesNext = SunCalc.getTimes(tomorrow, position.coords.latitude, position.coords.longitude);

    this.times = this.mergeTimes(times, timesNext);

  }

  private mergeTimes(times: SunCalc.GetTimesResult, ...mergeTimes: SunCalc.GetTimesResult[]): SunCalc.GetTimesResult {
    const now = new Date();

    mergeTimes.forEach(mergeTimesItem => {
      const values = (<[keyof SunCalc.GetTimesResult, SunCalc.GetTimesResult[keyof SunCalc.GetTimesResult]][]>Object.entries(mergeTimesItem));

      values.forEach(([key, value]) => {
        if (times[key] < now) times[key] = value;
      });
    });

    return times;
  }

}
