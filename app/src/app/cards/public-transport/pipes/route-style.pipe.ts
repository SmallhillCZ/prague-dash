import { Pipe, PipeTransform } from '@angular/core';
import { DepartureBoardData } from '../schema/departure-board-data';
import { RouteColors } from '../schema/route-colors';
import { RouteType } from '../schema/route-type';


@Pipe({
  name: 'routeStyle'
})
export class RouteStylePipe implements PipeTransform {

  transform(route: DepartureBoardData["departures"][0]["route"]): { [name: string]: any; } {

    let style: { [name: string]: any; } = {
      "background-color": this.getColor(route)
    };

    if (route.is_substitute_transport) style["color"] = RouteColors.yellow;

    return style;
  }

  getColor(route: DepartureBoardData["departures"][0]["route"]) {

    if (route.is_night) return RouteColors.black;

    switch (route.type) {

      case RouteType.Subway:
        switch (route.short_name) {
          case "A": return RouteColors.green;
          case "C": return RouteColors.red;
          case "B": return RouteColors.yellow;
        }
        break;

      case RouteType.Tram:
        return RouteColors.brown;

      case RouteType.Bus:
        return RouteColors.grey;
    }

    return RouteColors.black;
  }

}
