import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DepartureBoardData } from '../../schema/departure-board-data';
import { RouteType } from '../../schema/route-type';

@Component({
  selector: 'app-route-badge',
  templateUrl: './route-badge.component.html',
  styleUrls: ['./route-badge.component.scss']
})
export class RouteBadgeComponent implements OnInit, OnChanges {

  @Input()
  route!: DepartureBoardData["departures"][0]["route"];

  color: string = "black";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.color = this.getRouteColor(this.route);
  }

  getRouteColor(route: DepartureBoardData["departures"][0]["route"]) {

    if (route.is_night) return "dark";

    switch (route.type) {

      case RouteType.Subway:
        switch (route.short_name) {
          case "A": return "green";
          case "C": return "red";
          case "B": return "yellow";
        }
        break;

      case RouteType.Tram:
        return "brown";

      case RouteType.Bus:
        return "grey";
    }

    return "black";

  }

}
