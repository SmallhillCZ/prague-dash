import { Pipe, PipeTransform } from "@angular/core";
import { DepartureData } from "../schema/departure-board-data";
import { RouteColors } from "../schema/route-colors";
import { RouteTypeID } from "../schema/route-type";

@Pipe({
    name: "departureStyle",
    standalone: false
})
export class DepartureStylePipe implements PipeTransform {
  transform(departure: DepartureData): { [name: string]: any } {
    let style: { [name: string]: any } = {
      "background-color": this.getColor(departure),
    };

    if (departure.route.is_substitute_transport) style["color"] = RouteColors.yellow;

    return style;
  }

  getColor(departure: DepartureData) {
    const route = departure.route;

    if (route.is_night) return RouteColors.black;

    switch (route.type) {
      case RouteTypeID.Subway:
        switch (route.short_name) {
          case "A":
            return RouteColors.green;
          case "C":
            return RouteColors.red;
          case "B":
            return RouteColors.yellow;
        }
        break;

      case RouteTypeID.Tram:
        return RouteColors.brown;

      case RouteTypeID.Bus:
        return RouteColors.grey;
    }

    return RouteColors.black;
  }
}
